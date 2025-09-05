#!/usr/bin/env python3
"""
Comprehensive Backend API Test Suite for Portfolio Application
Tests all core API endpoints including portfolio data, contact forms, analytics, and admin functionality.
"""

import requests
import json
import os
from datetime import datetime
from typing import Dict, Any, Optional

# Load environment variables
BACKEND_URL = "https://satish-portfolio.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.admin_token = None
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if "Portfolio API" in data.get("message", ""):
                    self.log_test("API Root Endpoint", True, f"Status: {response.status_code}, Message: {data.get('message')}")
                    return True
                else:
                    self.log_test("API Root Endpoint", False, f"Unexpected response format", data)
                    return False
            else:
                self.log_test("API Root Endpoint", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_portfolio_data_retrieval(self):
        """Test GET /api/portfolio - should return portfolio data and track analytics"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio")
            if response.status_code == 200:
                data = response.json()
                # Check if portfolio data structure is correct
                required_fields = ["personal", "about", "skills", "experience", "projects"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Check personal info structure
                    personal = data.get("personal", {})
                    if "name" in personal and "email" in personal:
                        self.log_test("Portfolio Data Retrieval", True, 
                                    f"Retrieved portfolio for {personal.get('name')}, {len(data.get('projects', []))} projects")
                        return True
                    else:
                        self.log_test("Portfolio Data Retrieval", False, "Missing personal info fields", data)
                        return False
                else:
                    self.log_test("Portfolio Data Retrieval", False, f"Missing fields: {missing_fields}", data)
                    return False
            else:
                self.log_test("Portfolio Data Retrieval", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Portfolio Data Retrieval", False, f"Exception: {str(e)}")
            return False

    def test_travel_airline_project_verification(self):
        """Test GET /api/portfolio - verify Travel/Airline Solutions project is present with correct data"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio")
            if response.status_code == 200:
                data = response.json()
                projects = data.get("projects", [])
                
                # Check if we have 4 projects
                if len(projects) != 4:
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Expected 4 projects, got {len(projects)}")
                    return False
                
                # Find the Travel/Airline Solutions project (id=4)
                travel_project = None
                for project in projects:
                    if project.get("id") == 4:
                        travel_project = project
                        break
                
                if not travel_project:
                    self.log_test("Travel/Airline Project Verification", False, 
                                "Travel/Airline Solutions project (id=4) not found")
                    return False
                
                # Verify project details
                expected_title = "Travel/Airline Solutions Implementation"
                expected_category = "Aviation Technology"
                expected_impact = "Delivered 38 live NDC airline integrations, facilitated 30M+ incremental bookings, achieved 5-20% airfare savings and 15-20% workflow improvements"
                expected_technologies = ["NDC Integration", "GDS Systems", "API Development", "Travel Technology", "Airline Distribution", "Sabre Platform"]
                
                # Check title
                if travel_project.get("title") != expected_title:
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Title mismatch. Expected: '{expected_title}', Got: '{travel_project.get('title')}'")
                    return False
                
                # Check category
                if travel_project.get("category") != expected_category:
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Category mismatch. Expected: '{expected_category}', Got: '{travel_project.get('category')}'")
                    return False
                
                # Check impact
                if travel_project.get("impact") != expected_impact:
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Impact mismatch. Expected: '{expected_impact}', Got: '{travel_project.get('impact')}'")
                    return False
                
                # Check description contains NDC and GDS
                description = travel_project.get("description", "")
                if "NDC" not in description or "GDS" not in description:
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Description missing NDC/GDS details: '{description}'")
                    return False
                
                # Check technologies
                project_technologies = travel_project.get("technologies", [])
                missing_technologies = [tech for tech in expected_technologies if tech not in project_technologies]
                if missing_technologies:
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Missing technologies: {missing_technologies}")
                    return False
                
                # Check image URL is present
                image_url = travel_project.get("image", "")
                if not image_url or not image_url.startswith("http"):
                    self.log_test("Travel/Airline Project Verification", False, 
                                f"Invalid or missing image URL: '{image_url}'")
                    return False
                
                self.log_test("Travel/Airline Project Verification", True, 
                            f"✅ Travel/Airline Solutions project verified successfully with all required details")
                return True
                
            else:
                self.log_test("Travel/Airline Project Verification", False, 
                            f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Travel/Airline Project Verification", False, f"Exception: {str(e)}")
            return False

    def test_contact_form_submission(self):
        """Test POST /api/contact - test with sample contact form submission"""
        try:
            contact_data = {
                "name": "John Smith",
                "email": "john.smith@example.com",
                "subject": "Portfolio Inquiry - Collaboration Opportunity",
                "message": "Hi Satish, I came across your portfolio and I'm impressed with your work on digital transformation projects. I'd like to discuss a potential collaboration opportunity for a SaaS implementation project. Please let me know if you're available for a brief call."
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                # Check if response contains the submitted data with additional fields
                if (data.get("name") == contact_data["name"] and 
                    data.get("email") == contact_data["email"] and
                    "id" in data and "timestamp" in data):
                    self.log_test("Contact Form Submission", True, 
                                f"Message submitted successfully, ID: {data.get('id')}")
                    return True
                else:
                    self.log_test("Contact Form Submission", False, "Response format incorrect", data)
                    return False
            else:
                self.log_test("Contact Form Submission", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Exception: {str(e)}")
            return False

    def test_analytics_tracking(self):
        """Test POST /api/analytics/track - test event tracking"""
        try:
            # Test different types of analytics events
            events = [
                {"event_type": "page_view"},
                {"event_type": "section_view", "section": "about"},
                {"event_type": "section_view", "section": "projects"},
                {"event_type": "project_view", "section": "project_1"}
            ]
            
            success_count = 0
            for event in events:
                response = self.session.post(f"{self.base_url}/analytics/track", json=event)
                if response.status_code == 200:
                    data = response.json()
                    if "Event tracked successfully" in data.get("message", ""):
                        success_count += 1
                    else:
                        self.log_test("Analytics Tracking", False, f"Unexpected response for {event}", data)
                        return False
                else:
                    self.log_test("Analytics Tracking", False, 
                                f"Failed to track {event}, Status: {response.status_code}", response.text)
                    return False
            
            if success_count == len(events):
                self.log_test("Analytics Tracking", True, f"Successfully tracked {success_count} events")
                return True
            else:
                self.log_test("Analytics Tracking", False, f"Only {success_count}/{len(events)} events tracked")
                return False
                
        except Exception as e:
            self.log_test("Analytics Tracking", False, f"Exception: {str(e)}")
            return False

    def test_admin_login(self):
        """Test POST /api/admin/login - test with username: admin, password: admin123"""
        try:
            login_data = {
                "username": "admin",
                "password": "admin123"
            }
            
            response = self.session.post(f"{self.base_url}/admin/login", json=login_data)
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "token_type" in data:
                    self.admin_token = data["access_token"]
                    self.log_test("Admin Login", True, 
                                f"Login successful, token expires in {data.get('expires_in')} seconds")
                    return True
                else:
                    self.log_test("Admin Login", False, "Missing token in response", data)
                    return False
            else:
                self.log_test("Admin Login", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Admin Login", False, f"Exception: {str(e)}")
            return False

    def test_admin_token_verification(self):
        """Test GET /api/admin/verify - verify admin token"""
        if not self.admin_token:
            self.log_test("Admin Token Verification", False, "No admin token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.get(f"{self.base_url}/admin/verify", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("username") == "admin":
                    self.log_test("Admin Token Verification", True, "Token verified successfully")
                    return True
                else:
                    self.log_test("Admin Token Verification", False, "Unexpected username in response", data)
                    return False
            else:
                self.log_test("Admin Token Verification", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Admin Token Verification", False, f"Exception: {str(e)}")
            return False

    def test_protected_analytics_stats(self):
        """Test GET /api/analytics/stats - test protected admin route"""
        if not self.admin_token:
            self.log_test("Protected Analytics Stats", False, "No admin token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.get(f"{self.base_url}/analytics/stats?days=30", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["total_views", "section_views", "recent_activity", "contact_submissions", "downloads"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Protected Analytics Stats", True, 
                                f"Stats retrieved: {data.get('total_views')} views, {data.get('contact_submissions')} contacts")
                    return True
                else:
                    self.log_test("Protected Analytics Stats", False, f"Missing fields: {missing_fields}", data)
                    return False
            else:
                self.log_test("Protected Analytics Stats", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Protected Analytics Stats", False, f"Exception: {str(e)}")
            return False

    def test_protected_contact_messages(self):
        """Test GET /api/contact - test protected admin route for contact messages"""
        if not self.admin_token:
            self.log_test("Protected Contact Messages", False, "No admin token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.admin_token}"}
            response = self.session.get(f"{self.base_url}/contact", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Protected Contact Messages", True, 
                                f"Retrieved {len(data)} contact messages")
                    return True
                else:
                    self.log_test("Protected Contact Messages", False, "Response is not a list", data)
                    return False
            else:
                self.log_test("Protected Contact Messages", False, f"Status: {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Protected Contact Messages", False, f"Exception: {str(e)}")
            return False

    def test_unauthorized_access(self):
        """Test error handling for unauthorized access to protected routes"""
        try:
            # Test without token
            response = self.session.get(f"{self.base_url}/analytics/stats")
            if response.status_code == 401:
                self.log_test("Unauthorized Access Handling", True, "Correctly rejected request without token")
                return True
            else:
                self.log_test("Unauthorized Access Handling", False, 
                            f"Expected 401, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Unauthorized Access Handling", False, f"Exception: {str(e)}")
            return False

    def test_invalid_contact_form(self):
        """Test error handling for invalid contact form data"""
        try:
            # Test with missing required fields
            invalid_data = {
                "name": "A",  # Too short
                "email": "invalid-email",  # Invalid email
                "subject": "Hi",  # Too short
                "message": "Short"  # Too short
            }
            
            response = self.session.post(f"{self.base_url}/contact", json=invalid_data)
            if response.status_code == 422:  # Validation error
                self.log_test("Invalid Contact Form Handling", True, "Correctly rejected invalid data")
                return True
            else:
                self.log_test("Invalid Contact Form Handling", False, 
                            f"Expected 422, got {response.status_code}", response.text)
                return False
        except Exception as e:
            self.log_test("Invalid Contact Form Handling", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all test scenarios"""
        print("=" * 80)
        print("PORTFOLIO BACKEND API COMPREHENSIVE TEST SUITE")
        print("=" * 80)
        print(f"Testing against: {self.base_url}")
        print(f"Test started at: {datetime.now().isoformat()}")
        print()
        
        # Core functionality tests
        print("🔍 CORE API FUNCTIONALITY TESTS")
        print("-" * 40)
        self.test_api_root()
        self.test_portfolio_data_retrieval()
        self.test_contact_form_submission()
        self.test_analytics_tracking()
        
        # Authentication tests
        print("🔐 AUTHENTICATION TESTS")
        print("-" * 40)
        self.test_admin_login()
        self.test_admin_token_verification()
        
        # Protected routes tests
        print("🛡️  PROTECTED ROUTES TESTS")
        print("-" * 40)
        self.test_protected_analytics_stats()
        self.test_protected_contact_messages()
        
        # Error handling tests
        print("⚠️  ERROR HANDLING TESTS")
        print("-" * 40)
        self.test_unauthorized_access()
        self.test_invalid_contact_form()
        
        # Summary
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests} ✅")
        print(f"Failed: {failed_tests} ❌")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\nFAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  ❌ {result['test']}: {result['details']}")
        
        print(f"\nTest completed at: {datetime.now().isoformat()}")
        return passed_tests, failed_tests

if __name__ == "__main__":
    tester = PortfolioAPITester()
    passed, failed = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if failed == 0 else 1)