# ────────────────────────────────────────────
# WEB TIER — Next.js behind Nginx (Public Subnet)
# ────────────────────────────────────────────
resource "aws_instance" "web" {
  count                  = length(var.web_subnet_ids)
  ami                    = var.web_ami
  instance_type          = var.web_instance_type
  subnet_id              = var.web_subnet_ids[count.index]
  vpc_security_group_ids = [var.web_sg_id]
  key_name               = var.key_name



  tags = { Name = "${var.project_name}-web-${count.index + 1}", Tier = "web" }
}

resource "aws_lb_target_group_attachment" "web" {
  count            = length(aws_instance.web)
  target_group_arn = var.web_target_group_arn
  target_id        = aws_instance.web[count.index].id
  port             = 80
}

# ────────────────────────────────────────────
# APP TIER — Node.js (Private Subnet)
# ────────────────────────────────────────────
resource "aws_instance" "app" {
  count                  = length(var.app_subnet_ids)
  ami                    = var.app_ami
  instance_type          = var.app_instance_type
  subnet_id              = var.app_subnet_ids[count.index]
  vpc_security_group_ids = [var.app_sg_id]
  key_name               = var.key_name



  tags = { Name = "${var.project_name}-app-${count.index + 1}", Tier = "app" }
}

resource "aws_lb_target_group_attachment" "app" {
  count            = length(aws_instance.app)
  target_group_arn = var.app_target_group_arn
  target_id        = aws_instance.app[count.index].id
  port             = 3010
}
