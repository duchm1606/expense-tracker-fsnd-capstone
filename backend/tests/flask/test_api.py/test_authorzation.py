# Other modules
import pytest
import json
# Local modules
from app import create_app

accessToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllNT3JRUWJCdzR6YzRwQWtMVi1ZUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1ydGE3dncwcTQwbGVkeHJmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDkxNzEyMTc4NjE4NDA4Mjc0NiIsImF1ZCI6WyJleHBlbnNlLXRyYWNrZXItYXBpIiwiaHR0cHM6Ly9kZXYtcnRhN3Z3MHE0MGxlZHhyZi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE0OTY3NTg2LCJleHAiOjE3MTUwNTM5ODYsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhenAiOiJIWFpueHJqWllOb2NWNG9ta001OGpzdFJIN3NZN1ZTeSIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpidWRnZXRzIiwiZGVsZXRlOmV4cGVuc2VzIiwiZ2V0OmJ1ZGdldHMiLCJnZXQ6ZXhwZW5zZXMiLCJwYXRjaDpidWRnZXQiLCJwb3N0OmJ1ZGdldHMiLCJwb3N0OmV4cGVuc2VzIl19.G-VvtMfk8SqqjvpYZgoI7hhm-773yki6YTIaF-SByKUKxWxXM5RXHNx7puW8HHEObYjgreqnavNvjrnUkFgBx1tOyVsIDZoJHS6-pOe-JRtaSoYEZfv3ypCsdU08j1PjrA-OLoawyZnwUvhdKtn_W1viiMdXFbj1e-hMlUB27fmFXWHpQkJh_UyWsvSJlRQ5BGlWTdZkRY2GNzzbF3ggPJxLx5_YpKKTmao9MoKPfA0EQhJ269L5kAplB1aTlhOS2Yort1ryqrJDeQtUwHiWA-lhoPudkXQFdgk2SDM2-QjPYWkPW0btHA9bmDJktKxyXFLOA1FEF51HWldcghw1dA"


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
                     "Authorization": accessToken}
        )
        assert response.status_code == 200

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