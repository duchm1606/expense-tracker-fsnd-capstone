import json
import os
from flask import abort, request, _request_ctx_stack
from functools import wraps
from jose import jwt # type: ignore
from urllib.request import urlopen
# Import from dotenv

FLASK_DEBUG = os.environ.get("FLASK_DEBUG", False)
if FLASK_DEBUG:
    debug = FLASK_DEBUG
if debug == 'True':
    from app.config.dev import AUTH0_DOMAIN, ALGORITHMS, API_AUDIENCE

## AuthError Exception
'''
AuthError Exception
A standardized way to communicate auth failure modes
'''
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

## Auth Header
def get_token_auth_header():
    ## Check if authorization is not in request
    if 'Authorization' not in request.headers:
       raise AuthError({
           'code': 'authorization_header_mising',
           'description': 'Authorization header missing' 
       }, 401)
    ## Get the token
    auth_header = request.headers['Authorization']
    if not auth_header:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header missing'
        }, 401)
    header_parts = auth_header.split(' ')
    ## Check if token is valid
    if len(header_parts) != 2:
        raise AuthError({
            'code': 'authorization_token_invalid',
            'description': 'Invalid authorization header '
        }, 401)
    elif header_parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'authorization_token_invalid',
            'description': 'Authorization token must be bearer'
        }, 401)
    return header_parts[1]

def check_permissions(permission, payload):
    if 'permissions' not in payload:
        raise AuthError({
            'code': 'invalid_claims',
            'description': 'Permissions not included in JWT.'
        }, 400)
    
    if permission not in payload['permissions']:
        raise AuthError({
            'code': 'unauthorized',
            'description': 'Permission not existed'
        }, 403)
    
    return True

def verify_decode_jwt(token):
    jsonurl = urlopen(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json')
    jwks = json.loads(jsonurl.read())
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}

    if 'kid' not in unverified_header:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization malformed'
        }, 401)
    
    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n'  : key['n'],
                'e'  : key['e']
            }            
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer='https://' + AUTH0_DOMAIN + '/'
            )
            return payload
        
        except jwt.ExpiredSignatureError:
            raise AuthError({
                'code': 'token_expired',
                'description': 'Token expired.'
            })
        
        except jwt.JWTClaimsError:
            raise AuthError({
                'code': 'invalid_claims',
                'description': 'Incorrect claims. Please, check the audience and issuer.'
            }, 401)
        
        except Exception:
            raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to parse authentication token.'
            }, 400)
        
    raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to find the appropriate key.'
            }, 400)

'''
implement @requires_auth(permission) decorator method
    @INPUTS
        permission: string permission (i.e. 'post:drink')

    it should use the get_token_auth_header method to get the token
    it should use the verify_decode_jwt method to decode the jwt
    it should use the check_permissions method validate claims and check the requested permission
    return the decorator which passes the decoded payload to the decorated method
'''
def requires_auth(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_auth_header()
            payload = verify_decode_jwt(token)
            check_permissions(permission, payload)
            return f(payload, *args, **kwargs)

        return wrapper
    return requires_auth_decorator