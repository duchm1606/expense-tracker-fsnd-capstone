# Other modules
import pytest

# Local modules
from app import create_app
import json

@pytest.fixture
def app():
    app = create_app()
    return app
    
accessToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllNT3JRUWJCdzR6YzRwQWtMVi1ZUiJ9.eyJpc3MiOiJodHRwczovL2Rldi1ydGE3dncwcTQwbGVkeHJmLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDkxNzEyMTc4NjE4NDA4Mjc0NiIsImF1ZCI6WyJleHBlbnNlLXRyYWNrZXItYXBpIiwiaHR0cHM6Ly9kZXYtcnRhN3Z3MHE0MGxlZHhyZi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzE0ODAwNTQzLCJleHAiOjE3MTQ4ODY5NDMsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUiLCJhenAiOiJvRkVMQWlqdUxwZWJGWFlQd0FzMk5WVmtSNW1rNEtPcSIsInBlcm1pc3Npb25zIjpbImRlbGV0ZTpidWRnZXRzIiwiZGVsZXRlOmV4cGVuc2VzIiwiZ2V0OmJ1ZGdldHMiLCJnZXQ6ZXhwZW5zZXMiLCJwYXRjaDpidWRnZXQiLCJwb3N0OmJ1ZGdldHMiLCJwb3N0OmV4cGVuc2VzIl19.NTarJHo62VEgoDFTt-Ag9akp7Ys3PM-yDuZ9OOBb3srqZ7PGoYQgmGxcsFkAEMtMVKnnv6wCFsqnGB2VeN14u4iVBIIumMG_a-_-wwXrqU5f4uPZi99Ft8kAQy4xHzqG59b0cINEU5SBtkKc1RKpGyQF9ZfVFQOK4wYYkPz-Ff7VjMuD1gN3EEc4ep86xSw-4Ew4HZGD8qmexWHIsVESgScu2wZ3YJl1fWCswkHgFm5GCxHeYFWUtPXdYH-3O-cWYtraUbalrnGa3344D9wLEuG49AeCzU5V3_BpjBPyB22fZAU04gVnJ9oz6BAdW3MgULjtH8OyYcAf_fhYcqT5bQ"


def test_getGudget(app):
    with app.test_client() as client:
        response = client.get("/api/budgets/")
        assert response.status_code == 200

def test_getExpenses(app):
    with app.test_client() as client:
        response = client.get("/api/expenses/")
        assert response.status_code == 200

def test_getExpense(app):
    with app.test_client() as client:
        response = client.get("/api/expenses/")
        assert response.status_code == 200

# Add budget - successed
def test_success_AddBudgets(app):
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

# Add budget - failed 
def test_failed_AddBudgets(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "test",
            "icon": "✅"
        }
        response = client.post("/api/budgets/",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 400

# Delete budget - success
def test_success_DeleteBudgets(app):
    with app.test_client() as client:
        response = client.delete("/api/budgets/1",
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 200

# Delete budget - failed
def test_failed_DeleteBudgets(app):
    with app.test_client() as client:
        response = client.delete("/api/budgets/100",
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 404

# Edit budget - success
def test_success_ModifyBudgets(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "200",
            "icon": "✅"
        }
        response = client.patch("/api/budgets/2",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 200

# Edit budget - failed
def test_failed_ModifyBudgets(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "test",
            "icon": "✅"
        }
        response = client.patch("/api/budgets/2",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 400

# Add expense - failed 
def test_success_AddExpenses(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "2000",
        }
        response = client.post("/api/expenses/2",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 200


# Add expense - failed 
def test_failed_AddExpenses(app):
    with app.test_client() as client:
        data = {
            "name": "test",
            "amount": "test",
        }
        response = client.post("/api/expenses/2",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 400


# Delete expense - success
def test_success_DeleteExpenses(app):
    with app.test_client() as client:
        data = {
            "id": 2
        }
        response = client.delete("/api/expenses/",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 200

# Delete expense - failed
def test_failed_DeleteExpenses(app):
    with app.test_client() as client:
        data = {
            "id": 10000
        }
        response = client.delete("/api/expenses/",
            data = json.dumps(data),
            headers={"Content-Type": "application/json",
                     "Authorization": accessToken}
        )
        assert response.status_code == 404

