output "public_alb_dns" {
  description = "DNS name of the public-facing ALB (frontend)"
  value       = module.alb.public_alb_dns
}

output "internal_alb_dns" {
  description = "DNS name of the internal ALB (app tier)"
  value       = module.alb.internal_alb_dns
}

output "rds_primary_endpoint" {
  description = "Primary RDS endpoint (write)"
  value       = module.rds.db_endpoint
}

output "rds_replica_endpoint" {
  description = "Read replica endpoint"
  value       = module.rds.db_replica_endpoint
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "web_sg_id" {
  description = "Web tier security group ID"
  value       = module.security_groups.web_sg_id
}

output "web_instance_ip" {
  description = "Public IP of web EC2 instance"
  value       = module.ec2.web_public_ips[0]
}

output "app_instance_ip" {
  description = "Private IP of app EC2 instance"
  value       = module.ec2.app_private_ips[0]
}

