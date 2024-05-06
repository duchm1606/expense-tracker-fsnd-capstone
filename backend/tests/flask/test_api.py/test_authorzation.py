# Other modules
import pytest
import json
# Local modules
from app import create_app

adminToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllNT3JRUWJCdzR6YzRwQWtMVi1ZUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1ydGE3dncwcTQwbGVkeHJmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDkxNzEyMTc4NjE4NDA4Mjc0NiIsImF1ZCI6WyJleHBlbnNlLXRyYWNrZXItYXBpIiwiaHR0cHM6Ly9kZXYtcnRhN3Z3MHE0MGxlZHhyZi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE0OTY3NTg2LCJleHAiOjE3MTUwNTM5ODYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhenAiOiJIWFpueHJqWllOb2NWNG9ta001OGpzdFJIN3NZN1ZTeSIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpidWRnZXRzIiwiZGVsZXRlOmV4cGVuc2VzIiwiZ2V0OmJ1ZGdldHMiLCJnZXQ6ZXhwZW5zZXMiLCJwYXRjaDpidWRnZXQiLCJwb3N0OmJ1ZGdldHMiLCJwb3N0OmV4cGVuc2VzIl19.G-VvtMfk8SqqjvpYZgoI7hhm-773yki6YTIaF-SByKUKxWxXM5RXHNx7puW8HHEObYjgreqnavNvjrnUkFgBx1tOyVsIDZoJHS6-pOe-JRtaSoYEZfv3ypCsdU08j1PjrA-OLoawyZnwUvhdKtn_W1viiMdXFbj1e-hMlUB27fmFXWHpQkJh_UyWsvSJlRQ5BGlWTdZkRY2GNzzbF3ggPJxLx5_YpKKTmao9MoKPfA0EQhJ269L5kAplB1aTlhOS2Yort1ryqrJDeQtUwHiWA-lhoPudkXQFdgk2SDM2-QjPYWkPW0btHA9bmDJktKxyXFLOA1FEF51HWldcghw1dA"
memberToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllNT3JRUWJCdzR6YzRwQWtMVi1ZUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1ydGE3dncwcTQwbGVkeHJmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NjM4NThhOTE3Zjk5YTc0ZDNhNTA3YzgiLCJhdWQiOlsiZXhwZW5zZS10cmFja2VyLWFwaSIsImh0dHBzOi8vZGV2LXJ0YTd2dzBxNDBsZWR4cmYudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcxNDk5MjgzMCwiZXhwIjoxNzE1MDc5MjMwLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiYXpwIjoiSFhabnhyalpZTm9jVjRvbWtNNThqc3RSSDdzWTdWU3kiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6ZXhwZW5zZXMiLCJnZXQ6YnVkZ2V0cyIsImdldDpleHBlbnNlcyIsInBvc3Q6ZXhwZW5zZXMiXX0.lDcD3GNO_Vye6tHz9st63nRc0symxVQpgXozWAFo1LzdRJfuglhO22pUsd9V3QUtvziXTypG8ta0-hzM6L61Q0B2AHNZ-GpaDtpqQ5vJM52cNF4wN4OlPjLVWF1sA8XysZT0LZ8oG1mmuAPKzyhCezdIBlhy_Hm011px6esjk7h28P225QhMORWDbrPEVhqZHXdNhk5HYNpoB3MFG1D4k3do5Krz52AL38VKaihc40Q7KrWmIPLUbblLXcgnZ9KBS4s-VU6nyHb7XB0_4w4t2MrwSOt1FMJgoY-oW429MEy1ccEob9PKz1G2sN87w-o8BC8_FOP1D6TXE_SLW6tT2Q"

@pytest.fixture
def app():
    app = create_app()
    return app

#Test for Authorization
def test_success_Authorization(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "2000",
            "icon": "✅"
        }
        response = client.post("/api/budgets/",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": adminToken}
        )
        assert response.status_code == 200

#Test for Authorization
def test_failed_member_Authorization(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "2000",
            "icon": "✅"
        }
        response = client.post("/api/budgets/",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": memberToken}
        )
        assert response.status_code == 403

def test_failed_Authorization(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "2000",
            "icon": "✅"
        }
        response = client.post("/api/budgets/",
            data = json.dumps(data),
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 403