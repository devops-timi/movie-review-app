# ────────────────────────────────────────────
# DB Subnet Group
# ────────────────────────────────────────────
resource "aws_db_subnet_group" "this" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = var.db_subnet_ids

  tags = { Name = "${var.project_name}-db-subnet-group" }
}

# ────────────────────────────────────────────
# Parameter Group (MySQL 8.0)
# ────────────────────────────────────────────
resource "aws_db_parameter_group" "this" {
  name        = "${var.project_name}-mysql8"
  family      = "mysql8.0"
  description = "Custom MySQL 8.0 params"

  parameter {
    name  = "character_set_server"
    value = "utf8mb4"
  }

  parameter {
    name  = "collation_server"
    value = "utf8mb4_unicode_ci"
  }

  tags = { Name = "${var.project_name}-mysql8-param-group" }
}

# ────────────────────────────────────────────
# Primary RDS Instance (Multi-AZ)
# ────────────────────────────────────────────
resource "aws_db_instance" "primary" {
  identifier              = "${var.project_name}-mysql-primary"
  engine                  = "mysql"
  engine_version          = "8.4"
  instance_class          = var.db_instance_class
  allocated_storage       = 20
  max_allocated_storage   = 100         # Enable storage autoscaling up to 100 GB
  storage_type            = "gp3"
  storage_encrypted       = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.this.name
  parameter_group_name   = aws_db_parameter_group.this.name
  vpc_security_group_ids = [var.db_sg_id]

  multi_az               = true         # Automatic standby in second AZ
  publicly_accessible    = false
  deletion_protection    = false        # Set true in production
  skip_final_snapshot    = true         # Set false in production
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"

  tags = { Name = "${var.project_name}-mysql-primary" }
}

# ────────────────────────────────────────────
# Read Replica
# ────────────────────────────────────────────
resource "aws_db_instance" "replica" {
  identifier          = "${var.project_name}-mysql-replica"
  replicate_source_db = aws_db_instance.primary.identifier
  instance_class      = var.db_instance_class
  storage_encrypted   = true

  vpc_security_group_ids = [var.db_sg_id]
  publicly_accessible    = false
  skip_final_snapshot    = true

  # Replicas inherit engine, storage, and subnet group from the primary
  tags = { Name = "${var.project_name}-mysql-replica" }
}
