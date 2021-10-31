DELIMITER //

CREATE DEFINER=`root`@`localhost` PROCEDURE `studentAddOrEdit`(
IN _student_id INT,
IN _student_name VARCHAR(50),
IN _student_email VARCHAR(100),
IN _student_phone VARCHAR(15)
)
BEGIN
IF _student_id = 0 THEN
INSERT INTO student(student_name,student_email,student_phone)
VALUES (_student_name,_student_email,_student_phone);
ELSE
UPDATE student
SET
student_name = _student_name,
student_email = _student_email,
student_phone = _student_phone
WHERE student_id = _student_id;
END IF;
SELECT _student_id AS 'student_id';
END //

DELIMITER;