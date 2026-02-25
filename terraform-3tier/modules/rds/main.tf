# ────────────────────────────────────────────
# DB Subnet Group
# ────────────────────────────────────────────
resource "aws_db_subnet_group" "this" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = var.db_subnet_ids

  tags = { Name = "${var.project_name}-db-subnet-group" }
}

# ────────────────────────────────────────────
# Primary RDS Instance (Multi-AZ)
# ────────────────────────────────────────────
resource "aws_db_instance" "primary" {
  identifier              = "${var.project_name}-mysql-primary"
  engine                  = "mysql"
  engine_version          = "8.4"
  instance_class          = var.db_instance_class
  allocated_storage       = 400
  storage_type            = "gp2"
  storage_encrypted       = false

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [var.db_sg_id]

  multi_az               = false         # Automatic standby in second AZ
  publicly_accessible    = false
  deletion_protection    = false        # Set true in production
  skip_final_snapshot    = true         # Set false in production
  backup_retention_period = 7
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
  storage_encrypted   = false

  vpc_security_group_ids = [var.db_sg_id]
  publicly_accessible    = false
  skip_final_snapshot    = true

  # Replicas inherit engine, storage, and subnet group from the primary
  tags = { Name = "${var.project_name}-mysql-replica" }
}
