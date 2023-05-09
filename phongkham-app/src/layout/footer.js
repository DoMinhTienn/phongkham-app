import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
    return (
        <footer className="mt-auto">
        <Container>
          <Row>
            <Col sm={6} md={3}>
              <h5>Phòng khám XYZ</h5>
              <p>Địa chỉ: 371 Nguyễn Kiệm, P. 3, Q. Gò Vấp, TP. Hồ Chí Minh</p>
              <p>Điện thoại: 0123 456 789</p>
              <p>Email: phongkhamxyz@gmail.com</p>
            </Col>
            <Col sm={6} md={3}>
              <h5>Giờ làm việc</h5>
              <p>Thứ 2 - Thứ 7: 7:00 sáng - 5:00 chiều</p>
              <p>Chủ nhật: nghỉ</p>
            </Col>
            <Col sm={6} md={3}>
              <h5>Dịch vụ</h5>
              <ul>
                <li>Kiểm tra sức khỏe tổng quát</li>
                <li>Khám và chữa các bệnh lý nội khoa</li>
                <li>Khám và chữa các bệnh lý ngoại khoa</li>
                <li>Khám phụ khoa</li>
                <li>Khám thai</li>
              </ul>
            </Col>
            <Col sm={6} md={3}>
              <h5>Liên kết</h5>
              <ul>
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Dịch vụ</a></li>
                <li><a href="#">Đặt lịch khám</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="bg-light text-center py-3">
          © 2023 Phòng khám XYZ. All rights reserved.
        </div>
      </footer>

    )
}

export default memo(Footer)