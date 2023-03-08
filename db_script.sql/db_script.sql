CREATE DATABASE IF NOT EXISTS `mydb`;

USE `mydb`;
SET SQL_SAFE_UPDATES = 0;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
`id` int unsigned NOT NULL AUTO_INCREMENT,
`username` varchar(45) NOT NULL,
`password` varchar(100) DEFAULT NULL,
`fullName` varchar(100) DEFAULT NULL,
`role` varchar(100) DEFAULT NULL,
`email` varchar(150) DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `id_uk1` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
LOCK TABLES `users` WRITE;
INSERT INTO `users` (`id`, `username`, `password`, `fullName`, `role`, `email`)
VALUES
(1, 'gram', 'e10adc3949ba59abbe56e057f20f883e', 'Γραμματεία', 'secretary',''),
(2, 'andras', 'e10adc3949ba59abbe56e057f20f883e', 'Ανδράς Χρήστος', 'teacher', 'andraschris@autom.teithe.gr'),
(3, 'teach1', 'e10adc3949ba59abbe56e057f20f883e', 'teacher1', 'teacher', 'teacher1@autom.teithe.gr'),
(4, 'teach2', 'e10adc3949ba59abbe56e057f20f883e', 'teacher2', 'teacher', 'teacher2@autom.teithe.gr'),
(5, 'aut1', 'e10adc3949ba59abbe56e057f20f883e', 'Βαγγελινού Ελισάβετ', 'student',''),
(6, 'aut2', 'e10adc3949ba59abbe56e057f20f883e', 'Παπαδόπουλος Γιώργος', 'student',''),
(7, 'aut3', 'e10adc3949ba59abbe56e057f20f883e', 'Καραγιάννη Μαρία', 'student',''),
(8, 'aut4', 'e10adc3949ba59abbe56e057f20f883e', 'Καραγιάννης Ιωάννης', 'student',''),
(9, 'aut5', 'e10adc3949ba59abbe56e057f20f883e', 'Γκέσιου Αθηνά', 'student','');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `mathima`;
CREATE TABLE `mathima` (
`id` int unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(100) NOT NULL,
`url` varchar(45) NOT NULL,
`examino` int(10) NOT NULL,
`description` varchar(100) DEFAULT NULL,
`upoxrewtiko` varchar(45) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
LOCK TABLES `mathima` WRITE;
INSERT INTO `mathima` (`id`, `name`, `url`, `examino`, `description`,`upoxrewtiko`)
VALUES
(1, 'ΑΓΓΛΙΚΗ ΟΡΟΛΟΓΙΑ', 'agglikh_orologia', '1', 'test Aggliki Orologia','Επιλογής'),
(2, 'ΕΙΣΑΓΩΓΗ ΣΤΗΝ ΕΠΙΣΤΗΜΗ ΤΩΝ Η/Υ', 'eisagogi_epistimi_yh', '1', 'test Eisagogi epistimi HY','Υποχρεωτικό'),
(3, 'ΓΡΑΜΜΙΚΗ ΑΛΓΕΥΡΑ ΚΑΙ ΘΕΩΡΙΑ ΜΙΓΑΔΙΚΩΝ', 'grammikh_algeura_thewria_migadikwn', '1', 'test Grammiki Algebra Theoria Migadikon', 'Υποχρεωτικό'),
(4, 'ΜΑΘΗΜΑΤΙΚΟΣ ΛΟΓΙΣΜΟΣ', 'mathimatikos_logismos', '1', 'mathimatikos_logismos', 'Υποχρεωτικό'),
(5, 'ΣΤΑΤΙΚΗ', 'statikh', '1', 'statikh', 'Υποχρεωτικό'),
(6, 'ΤΕΧΝΙΚΗ ΣΧΕΔΙΑΣΗ', 'texnikh_sxediash', '1', 'texnikh_sxediash', 'Υποχρεωτικό'),
(7, 'ΦΥΣΙΚΗ', 'fusikh', '1', 'fusikh', 'Υποχρεωτικό'),
(8, 'ΔΥΝΑΜΙΚΗ', 'dunamikh', '2', 'test Dinamiki','Υποχρεωτικό'),
(9, 'ΑΝΤΙΚΕΙΜΕΝΟΣΤΡΕΦΗΣ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ', 'antikeimenostrefhs_programmatismos', '2', 'test Antikeimenostrafis Programmatismos','Υποχρεωτικό'),
(10, 'ΕΦΑΡΜΟΣΜΕΝΗ ΘΕΡΜΟΔΥΝΑΙΚΗ', 'efarm_thermodunamikh','2', 'efarm_thermodunamikh', 'Υποχρεωτικό'),
(11, 'ΗΛΕΚΤΡΙΚΑ ΚΥΚΛΩΜΑΤΑ', 'hlektrika_kuklwmata', '2', 'hlektrika_kuklwmata', 'Υποχρεωτικό'),
(12, 'ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ ΓΙΑ ΜΗΧΑΝΙΚΟΥΣ', 'programmatismos_gia_mhxanikous', '2', 'programmatismos_gia_mhxanikous', 'Υποχρεωτικό'),
(13, 'ΤΕΧΝΟΛΟΓΙΑ ΥΛΙΚΩΝ', 'texnologia_ulikwn', '2', 'texnologia_ulikwn', 'Υποχρεωτικό'),
(14, 'ΗΛΕΚΤΡΟΤΕΧΝΙΚΑ ΥΛΙΚΑ', 'hlektrotexnika_ulika', '2', 'hlektrotexnika_ulika', 'Επιλογής'),
(15, 'ΙΣΤΟΡΙΑ ΠΟΛΙΤΙΣΜΟΥ ΚΑΙ ΤΕΧΝΟΛΟΓΙΑΣ', 'istoria_politismou_texnologias', '2', 'istoria_politismou_texnologias', 'Επιλογής'),
(16, 'ΣΥΝΑΡΤΗΣΕΙΣ ΠΟΛΛΩΝ ΜΕΤΑΒΛΗΤΩΝ', 'sunarthseis_pollwn_metavlhtwn', '2', 'sunarthseis_pollwn_metavlhtwn', 'Επιλογής' ),
(17, 'ΦΙΛΟΣΟΦΙΑ ΤΗΣ ΤΕΧΝΟΛΟΓΙΑΣ', 'filosofia_texnologias', '2', 'filosofia_texnologias', 'Επιλογής'),
(18, 'ΑΝΤΟΧΗ ΤΩΝ ΥΛΙΚΩΝ', 'antoxh_ulikwn', '3', 'antoxh_ulikwn', 'Υποχρεωτικό'),
(19, 'ΑΡΙΘΜΗΤΙΚΗ ΑΝΑΛΥΣΗ', 'arithmhtikh_analush', '3', 'arithmhtikh_analush', 'Υποχρεωτικό'),
(20, 'ΗΛΕΚΤΡΟΝΙΚΑ ΣΥΣΤΗΜΑΤΑ', 'ulektronika_sust', '3', 'ulektronika_sust', 'Υποχρεωτικό'),
(21, 'ΘΕΩΡΙΑ ΠΙΘΑΝΟΤΗΤΩΝ ΚΑΙ ΣΤΑΤΙΣΤΙΚΗ', 'thewria_pithan_statistikhs', '3', 'thewria_pithan_statistikhs', 'Υποχρεωτικό'),
(22, 'ΜΗΧΑΝΟΥΡΓΙΚΗ ΤΕΧΝΟΛΟΓΙΑ', 'mhxanourgikh_texn', '3', 'mhxanourgikh_texn', 'Υποχρεωτικό'),
(23, 'ΒΙΟΜΗΧΑΝΙΚΗ ΥΓΙΕΙΝΗ ΚΑΙ ΑΣΦΑΛΕΙΑ', 'viomhxanikh_ugieinh_asfaleia', '3', 'viomhxanikh_ugieinh_asfaleia', 'Επιλογής'),
(24, 'ΕΙΔΙΚΑ ΘΕΜΑΤΑ ΦΥΣΙΚΗΣ', 'eidika_themata_fusikhs', '3', 'eidika_themata_fusikhs', 'Επιλογής'),
(25, 'ΚΟΙΝΩΝΙΑ ΠΛΗΡΟΦΟΡΙΑΣ ΚΑΙ 4Η ΒΙΟΜΗΧΑΝΙΚΗ ΕΠΑΝΑΣΤΑΣΗ', 'koinwnia_plhrof_4h_viomhx_epan', '3', 'koinwnia_plhrof_4h_viomhx_epan', 'Επιλογής'),
(26, 'ΑΞΙΟΠΙΣΤΙΑ ΚΑΙ ΣΥΝΤΗΡΗΣΗ', 'aksiopistia_sunthrhsh', '4', 'aksiopistia_sunthrhsh','Υποχρεωτικό'),
(27, 'ΘΕΩΡΙΑ ΜΕΤΑΣΧΗΜΑΤΙΣΜΩΝ & ΣΥΣΤΗΜΑΤΩΝ','thewria_metasxhmatismwn', '4','thewria_metasxhmatismwn', 'Υποχρεωτικό'),
(28, 'ΜΕΤΡΟΛΟΓΙΑ ΕΛΕΓΧΟΣ ΠΟΙΟΤΗΤΑΣ', 'metrologia', '4', 'metrologia', 'Υποχρεωτικό'),
(29, 'ΡΕΥΣΤΟΜΗΧΑΝΙΚΗ', 'reustomhxanikh', '4', 'reustomhxanikh', 'Υποχρεωτικό'),
(30, 'ΣΤΟΙΧΕΙΑ ΜΗΧΑΝΩΝ Ι', 'stoixeia_mhxanwn_1', '4', 'stoixeia_mhxanwn_1', 'Υποχρεωτικό'),
(31, 'ΣΥΣΤΗΜΑΤΑ ΠΑΡΑΓΩΓΗΣ', 'sust_paragwghs', '4', 'sust_paragwghs', 'Υποχρεωτικό'),
(32, 'ΑΝΤΙΚΕΙΜΕΝΟΣΤΡΕΦΗΣ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ', 'antikeimenostrefhs_programmatismos' ,'4', 'antikeimenostrefhs_programmatismos', 'Επιλογής'),
(33, 'ΔΙΑΧΕΙΡΗΣΗ ΑΞΙΠΙΣΤΙΑΣ ΣΤΟ ΔΙΑΔΙΚΤΥΟ ΤΩΝ ΠΡΑΓΜΑΤΩΝ', 'diax_aksiopistias_diadiktuo_twn_pragm', '4', 'diax_aksiopistias_diadiktuo_twn_pragm', 'Επιλογής'),
(34, 'ΜΙΚΡΟΗΛΕΚΤΡΟΜΗΧΑΝΟΛΟΓΙΚΑ ΣΥΣΤΗΜΑΤΑ', 'mikrohlektromhxanologika_sust', '4', 'mikrohlektromhxanologika_sust', 'Επιλογής'),
(35, 'ΠΡΟΗΓΜΕΝΑ ΨΗΦΙΑΚΑ ΣΥΣΤΗΜΑΤΑ', 'prohgmena_pshfiaka_sust', '4', 'prohgmena_pshfiaka_sust', 'Επιλογής');
/*!40000 ALTER TABLE `mathima` ENABLE KEYS */;
UNLOCK TABLES;


CREATE TABLE `enrollements` (
  `user_id` int unsigned NOT NULL,
  `mathima_id` int unsigned NOT NULL,
 CONSTRAINT `enrollements_pk` PRIMARY KEY (`user_id`, `mathima_id`),
 CONSTRAINT `FK_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
 CONSTRAINT `FK_mathima` FOREIGN KEY (`mathima_id`) REFERENCES `mathima` (`id`)
);

LOCK TABLES `enrollements` WRITE;
INSERT INTO `enrollements` (`user_id`, `mathima_id`)
VALUES
(2, 13),
(2, 2),
(2, 6),
(2, 5),
(3, 3),
(3, 10),
(3, 20),
(3, 25),
(4, 12),
(4, 30),
(4, 7),
(4, 14),
(5, 2),
(5, 12),
(5, 30),
(6, 1),
(6, 2),
(6, 25),
(7, 5),
(7,10),
(7,20),
(7, 13);

/*!40000 ALTER TABLE `enrollements` ENABLE KEYS */;
UNLOCK TABLES;


use mydb;
DROP TABLE IF EXISTS `anakoinoseis`;
CREATE TABLE `anakoinoseis` (
`id` int unsigned NOT NULL AUTO_INCREMENT,
`content` varchar(400) NOT NULL,
`to_mathima` int unsigned NOT NULL,
`created_by` int unsigned NOT NULL,
`creation_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
KEY `anakoinoseis_to_mathima_fk` (`to_mathima`),
KEY `anakoinoseis_created_by_fk` (`created_by`),
CONSTRAINT `anakoinoseis_to_mathima_fk` FOREIGN KEY (`to_mathima`) REFERENCES `mathima` (`id`),
CONSTRAINT `anakoinoseis_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
);
LOCK TABLES `anakoinoseis` WRITE;
INSERT INTO `anakoinoseis` (`id`, `content`, `to_mathima`, `created_by`, `creation_timestamp`)
VALUES
(1, 'Ανακοίνωση καθηγητή', 13, 2, '2020-10-02 15:27:09.513000'),
(2, 'Νέο εργαστηριακό βίντεο', 3, 1, '2021-10-02 15:27:09.513000'),
(3, 'Ανακοίνωση μαθήματος', 2, 2, '2021-10-02 17:27:09.513000'),
(4, 'Ανακοίνωση εξεταστικής', 10, 3, '2020-10-02 15:27:09.513000'),
(5, 'Ανακοίνωση', 7, 4, '2023-01-02 17:27:09.513000'),
(6, 'Νέο Βίντεο', 30, 4, '2022-03-02 17:27:09.513000');
/*!40000 ALTER TABLE `anakoinoseis` ENABLE KEYS */;
UNLOCK TABLES;

use mydb;
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
`id` int unsigned NOT NULL AUTO_INCREMENT,
`originalname` varchar(400) NOT NULL,
`decodedname` varchar(400) default NULL,
`to_mathima` int unsigned NOT NULL,
`created_by` int unsigned NOT NULL,
`youtube_url` varchar(800) default null,
`creation_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
KEY `video_created_by_fk` (`created_by`),
CONSTRAINT `video_to_mathima_fk` FOREIGN KEY (`to_mathima`) REFERENCES `mathima` (`id`),
CONSTRAINT `video_created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
);
INSERT INTO `video` (`id`, `originalname`, `decodedname`, `to_mathima`, `created_by`, `youtube_url`, `creation_timestamp`)
VALUES
(1, 'Video.mp4', 'da779396acfe5c39c79027b8829f27b2', 13, 2, null, '2022-10-02 15:27:09.513000'),
(2, 'Video1.mp4', 'bd779396acfe5c39c79027b8829f27b2', 2, 2, null, '2023-01-02 15:27:09.513000'),
(3, 'Video 3.mp4', 'db779396acfe5c39c79027b8829f27b2', 6, 2, null, '2021-11-19 17:33:19.111000'),
(4, '10 Incredible Arduino projects you must try in 2022!', null, 20, 3, '0fi5p-8jXf8', '2021-05-07 17:33:19.111000'),
(5, 'Μαθήματα C++ |1| Εισαγωγή', null, 2, 3, 'bYzeSpNd3Vw', '2019-05-07 17:33:19.111000'),
(6, 'Μοντάρισμα πίνακα Σήμανση Εργαλεία Υλικά που θα χρειαστούμε', null, 14, 4, 'EZ8n1LmnnXU', '2018-05-07 17:33:19.111000'),
(7, 'Διαφορικές Εξισώσεις: Μετασχηματισμός Laplace AEI', null, 3, 3, 'gx4JM9VvrjM', '2018-05-07 17:33:19.111000'),
(8, 'Τεχνική Μηχανική 1-1: Ισοστατικοί Δοκοί: Πρόβλημα 0001', null, 5, 2, 'NPRJnDt5lqE', '2018-05-07 17:33:19.111000'),
(9, 'Video 4.mp4', 'dc779396acfe5c39c79027b8829f27b2', 25, 3, null, '2021-11-19 17:33:19.111000');

/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

CREATE TABLE `videorating` (
  `user_id` int unsigned NOT NULL,
  `video_id` int unsigned NOT NULL,
  `rank` int unsigned NOT NULL,
 CONSTRAINT `videorating_pk` PRIMARY KEY (`user_id`, `video_id`),
 CONSTRAINT `videorating_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
 CONSTRAINT `videorating_video_fk` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`)
);

LOCK TABLES `videorating` WRITE;
INSERT INTO `videorating` (`user_id`, `video_id`, `rank`)
VALUES
(5, 1, 5),
(6, 2, 3),
(7, 3, 2),
(8, 1, 1),
(6, 3, 5);
/*!40000 ALTER TABLE `videorating` ENABLE KEYS */;
UNLOCK TABLES;


ALTER USER 'root' identified with mysql_native_password BY 'toor';
