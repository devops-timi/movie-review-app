terraform {
  backend "s3" {
    bucket         = "movie-review-app-state"   # ← replace with your bucket name
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "movie-review-state-lock"        # ← DynamoDB table for locking
    encrypt        = true
  }
}
