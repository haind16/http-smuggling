from mitmproxy import http


def request(flow):
    if "admin" in flow.request.url:
        flow.response = http.HTTPResponse.make(403, b"You do not have permission to access!\n")
