# Other modules
import pytest
import json
# Local modules
from app import create_app

accessToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllNT3JRUWJCdzR6YzRwQWtMVi1ZUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1ydGE3dncwcTQwbGVkeHJmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDkxNzEyMTc4NjE4NDA4Mjc0NiIsImF1ZCI6WyJleHBlbnNlLXRyYWNrZXItYXBpIiwiaHR0cHM6Ly9kZXYtcnRhN3Z3MHE0MGxlZHhyZi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE0ODAwNTQzLCJleHAiOjE3MTQ4ODY5NDMsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhenAiOiJvRkVMQWlqdUxwZWJGWFlQd0FzMk5WVmtSNW1rNEtPcSIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpidWRnZXRzIiwiZGVsZXRlOmV4cGVuc2VzIiwiZ2V0OmJ1ZGdldHMiLCJnZXQ6ZXhwZW5zZXMiLCJwYXRjaDpidWRnZXQiLCJwb3N0OmJ1ZGdldHMiLCJwb3N0OmV4cGVuc2VzIl19.NTarJHo62VEgoDFTt-Ag9akp7Ys3PM-yDuZ9OOBb3srqZ7PGoYQgmGxcsFkAEMtMVKnnv6wCFsqnGB2VeN14u4iVBIIumMG_a-_-wwXrqU5f4uPZi99Ft8kAQy4xHzqG59b0cINEU5SBtkKc1RKpGyQF9ZfVFQOK4wYYkPz-Ff7VjMuD1gN3EEc4ep86xSw-4Ew4HZGD8qmexWHIsVESgScu2wZ3YJl1fWCswkHgFm5GCxHeYFWUtPXdYH-3O-cWYtraUbalrnGa3344D9wLEuG49AeCzU5V3_BpjBPyB22fZAU04gVnJ9oz6BAdW3MgULjtH8OyYcAf_fhYcqT5bQ"

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