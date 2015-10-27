import socket
import os
from urllib2 import urlopen, URLError, HTTPError

socket.setdefaulttimeout( 23 )  # timeout in seconds

url = 'http://192.168.0.160:3000'
try :
    response = urlopen( url )
except HTTPError, e:
    print 'The server couldn\'t fulfill the request. Reason:', str(e.code)
except URLError, e:
    os.system("sudo service pinode start")
    print 'We failed to reach a server. Reason:', str(e.reason)
else :
    html = response.read()
    print 'got response!'
    # do something, turn the light on/off or whatever