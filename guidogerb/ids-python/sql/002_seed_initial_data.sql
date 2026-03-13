-- ============================================================================
-- IDS (Identity Database System) - Initial Seed Data
-- Populates the 8-bit symbol table with foundational symbols
-- ============================================================================

-- ============================================================================
-- ASCII CONTROL CHARACTERS (0-31)
-- ============================================================================

INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(0, '', 'NULL', 'Null character', 'character', 'ASCII'),
(1, '', 'SOH', 'Start of Heading', 'character', 'ASCII'),
(2, '', 'STX', 'Start of Text', 'character', 'ASCII'),
(3, '', 'ETX', 'End of Text', 'character', 'ASCII'),
(4, '', 'EOT', 'End of Transmission', 'character', 'ASCII'),
(5, '', 'ENQ', 'Enquiry', 'character', 'ASCII'),
(6, '', 'ACK', 'Acknowledgment', 'character', 'ASCII'),
(7, '', 'BEL', 'Bell', 'character', 'ASCII'),
(8, '', 'BS', 'Backspace', 'character', 'ASCII'),
(9, '	', 'TAB', 'Horizontal Tab', 'character', 'ASCII'),
(10, '
', 'LF', 'Line Feed', 'character', 'ASCII'),
(11, '', 'VT', 'Vertical Tab', 'character', 'ASCII'),
(12, '', 'FF', 'Form Feed', 'character', 'ASCII'),
(13, '
', 'CR', 'Carriage Return', 'character', 'ASCII'),
(14, '', 'SO', 'Shift Out', 'character', 'ASCII'),
(15, '', 'SI', 'Shift In', 'character', 'ASCII'),
(16, '', 'DLE', 'Data Link Escape', 'character', 'ASCII'),
(17, '', 'DC1', 'Device Control 1', 'character', 'ASCII'),
(18, '', 'DC2', 'Device Control 2', 'character', 'ASCII'),
(19, '', 'DC3', 'Device Control 3', 'character', 'ASCII'),
(20, '', 'DC4', 'Device Control 4', 'character', 'ASCII'),
(21, '', 'NAK', 'Negative Acknowledgment', 'character', 'ASCII'),
(22, '', 'SYN', 'Synchronous Idle', 'character', 'ASCII'),
(23, '', 'ETB', 'End of Transmission Block', 'character', 'ASCII'),
(24, '', 'CAN', 'Cancel', 'character', 'ASCII'),
(25, '', 'EM', 'End of Medium', 'character', 'ASCII'),
(26, '', 'SUB', 'Substitute', 'character', 'ASCII'),
(27, '', 'ESC', 'Escape', 'character', 'ASCII'),
(28, '', 'FS', 'File Separator', 'character', 'ASCII'),
(29, '', 'GS', 'Group Separator', 'character', 'ASCII'),
(30, '', 'RS', 'Record Separator', 'character', 'ASCII'),
(31, '', 'US', 'Unit Separator', 'character', 'ASCII');

-- ============================================================================
-- ASCII PRINTABLE CHARACTERS (32-126)
-- ============================================================================

-- Space and punctuation (32-47)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(32, ' ', 'SPACE', 'Space', 'character', 'ASCII'),
(33, '!', 'EXCLAMATION', 'Exclamation mark', 'punctuation', 'ASCII'),
(34, '"', 'QUOTATION', 'Quotation mark', 'punctuation', 'ASCII'),
(35, '#', 'NUMBER_SIGN', 'Number sign', 'symbol', 'ASCII'),
(36, '$', 'DOLLAR', 'Dollar sign', 'symbol', 'ASCII'),
(37, '%', 'PERCENT', 'Percent sign', 'symbol', 'ASCII'),
(38, '&', 'AMPERSAND', 'Ampersand', 'symbol', 'ASCII'),
(39, '''', 'APOSTROPHE', 'Apostrophe', 'punctuation', 'ASCII'),
(40, '(', 'LEFT_PAREN', 'Left parenthesis', 'punctuation', 'ASCII'),
(41, ')', 'RIGHT_PAREN', 'Right parenthesis', 'punctuation', 'ASCII'),
(42, '*', 'ASTERISK', 'Asterisk', 'symbol', 'ASCII'),
(43, '+', 'PLUS', 'Plus sign', 'symbol', 'ASCII'),
(44, ',', 'COMMA', 'Comma', 'punctuation', 'ASCII'),
(45, '-', 'HYPHEN', 'Hyphen-minus', 'punctuation', 'ASCII'),
(46, '.', 'PERIOD', 'Period', 'punctuation', 'ASCII'),
(47, '/', 'SLASH', 'Slash', 'punctuation', 'ASCII');

-- Numbers (48-57)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(48, '0', 'DIGIT_0', 'Digit Zero', 'character', 'ASCII'),
(49, '1', 'DIGIT_1', 'Digit One', 'character', 'ASCII'),
(50, '2', 'DIGIT_2', 'Digit Two', 'character', 'ASCII'),
(51, '3', 'DIGIT_3', 'Digit Three', 'character', 'ASCII'),
(52, '4', 'DIGIT_4', 'Digit Four', 'character', 'ASCII'),
(53, '5', 'DIGIT_5', 'Digit Five', 'character', 'ASCII'),
(54, '6', 'DIGIT_6', 'Digit Six', 'character', 'ASCII'),
(55, '7', 'DIGIT_7', 'Digit Seven', 'character', 'ASCII'),
(56, '8', 'DIGIT_8', 'Digit Eight', 'character', 'ASCII'),
(57, '9', 'DIGIT_9', 'Digit Nine', 'character', 'ASCII');

-- More punctuation (58-64)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(58, ':', 'COLON', 'Colon', 'punctuation', 'ASCII'),
(59, ';', 'SEMICOLON', 'Semicolon', 'punctuation', 'ASCII'),
(60, '<', 'LESS_THAN', 'Less-than sign', 'symbol', 'ASCII'),
(61, '=', 'EQUALS', 'Equals sign', 'symbol', 'ASCII'),
(62, '>', 'GREATER_THAN', 'Greater-than sign', 'symbol', 'ASCII'),
(63, '?', 'QUESTION', 'Question mark', 'punctuation', 'ASCII'),
(64, '@', 'AT_SIGN', 'At sign', 'symbol', 'ASCII');

-- Uppercase letters (65-90)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(65, 'A', 'LATIN_A', 'Latin Capital Letter A', 'character', 'ASCII'),
(66, 'B', 'LATIN_B', 'Latin Capital Letter B', 'character', 'ASCII'),
(67, 'C', 'LATIN_C', 'Latin Capital Letter C', 'character', 'ASCII'),
(68, 'D', 'LATIN_D', 'Latin Capital Letter D', 'character', 'ASCII'),
(69, 'E', 'LATIN_E', 'Latin Capital Letter E', 'character', 'ASCII'),
(70, 'F', 'LATIN_F', 'Latin Capital Letter F', 'character', 'ASCII'),
(71, 'G', 'LATIN_G', 'Latin Capital Letter G', 'character', 'ASCII'),
(72, 'H', 'LATIN_H', 'Latin Capital Letter H', 'character', 'ASCII'),
(73, 'I', 'LATIN_I', 'Latin Capital Letter I', 'character', 'ASCII'),
(74, 'J', 'LATIN_J', 'Latin Capital Letter J', 'character', 'ASCII'),
(75, 'K', 'LATIN_K', 'Latin Capital Letter K', 'character', 'ASCII'),
(76, 'L', 'LATIN_L', 'Latin Capital Letter L', 'character', 'ASCII'),
(77, 'M', 'LATIN_M', 'Latin Capital Letter M', 'character', 'ASCII'),
(78, 'N', 'LATIN_N', 'Latin Capital Letter N', 'character', 'ASCII'),
(79, 'O', 'LATIN_O', 'Latin Capital Letter O', 'character', 'ASCII'),
(80, 'P', 'LATIN_P', 'Latin Capital Letter P', 'character', 'ASCII'),
(81, 'Q', 'LATIN_Q', 'Latin Capital Letter Q', 'character', 'ASCII'),
(82, 'R', 'LATIN_R', 'Latin Capital Letter R', 'character', 'ASCII'),
(83, 'S', 'LATIN_S', 'Latin Capital Letter S', 'character', 'ASCII'),
(84, 'T', 'LATIN_T', 'Latin Capital Letter T', 'character', 'ASCII'),
(85, 'U', 'LATIN_U', 'Latin Capital Letter U', 'character', 'ASCII'),
(86, 'V', 'LATIN_V', 'Latin Capital Letter V', 'character', 'ASCII'),
(87, 'W', 'LATIN_W', 'Latin Capital Letter W', 'character', 'ASCII'),
(88, 'X', 'LATIN_X', 'Latin Capital Letter X', 'character', 'ASCII'),
(89, 'Y', 'LATIN_Y', 'Latin Capital Letter Y', 'character', 'ASCII'),
(90, 'Z', 'LATIN_Z', 'Latin Capital Letter Z', 'character', 'ASCII');

-- More punctuation (91-96)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(91, '[', 'LEFT_BRACKET', 'Left square bracket', 'punctuation', 'ASCII'),
(92, '\', 'BACKSLASH', 'Backslash', 'punctuation', 'ASCII'),
(93, ']', 'RIGHT_BRACKET', 'Right square bracket', 'punctuation', 'ASCII'),
(94, '^', 'CARET', 'Caret', 'symbol', 'ASCII'),
(95, '_', 'UNDERSCORE', 'Underscore', 'punctuation', 'ASCII'),
(96, '`', 'GRAVE_ACCENT', 'Grave accent', 'symbol', 'ASCII');

-- Lowercase letters (97-122)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(97, 'a', 'LATIN_a', 'Latin Small Letter a', 'character', 'ASCII'),
(98, 'b', 'LATIN_b', 'Latin Small Letter b', 'character', 'ASCII'),
(99, 'c', 'LATIN_c', 'Latin Small Letter c', 'character', 'ASCII'),
(100, 'd', 'LATIN_d', 'Latin Small Letter d', 'character', 'ASCII'),
(101, 'e', 'LATIN_e', 'Latin Small Letter e', 'character', 'ASCII'),
(102, 'f', 'LATIN_f', 'Latin Small Letter f', 'character', 'ASCII'),
(103, 'g', 'LATIN_g', 'Latin Small Letter g', 'character', 'ASCII'),
(104, 'h', 'LATIN_h', 'Latin Small Letter h', 'character', 'ASCII'),
(105, 'i', 'LATIN_i', 'Latin Small Letter i', 'character', 'ASCII'),
(106, 'j', 'LATIN_j', 'Latin Small Letter j', 'character', 'ASCII'),
(107, 'k', 'LATIN_k', 'Latin Small Letter k', 'character', 'ASCII'),
(108, 'l', 'LATIN_l', 'Latin Small Letter l', 'character', 'ASCII'),
(109, 'm', 'LATIN_m', 'Latin Small Letter m', 'character', 'ASCII'),
(110, 'n', 'LATIN_n', 'Latin Small Letter n', 'character', 'ASCII'),
(111, 'o', 'LATIN_o', 'Latin Small Letter o', 'character', 'ASCII'),
(112, 'p', 'LATIN_p', 'Latin Small Letter p', 'character', 'ASCII'),
(113, 'q', 'LATIN_q', 'Latin Small Letter q', 'character', 'ASCII'),
(114, 'r', 'LATIN_r', 'Latin Small Letter r', 'character', 'ASCII'),
(115, 's', 'LATIN_s', 'Latin Small Letter s', 'character', 'ASCII'),
(116, 't', 'LATIN_t', 'Latin Small Letter t', 'character', 'ASCII'),
(117, 'u', 'LATIN_u', 'Latin Small Letter u', 'character', 'ASCII'),
(118, 'v', 'LATIN_v', 'Latin Small Letter v', 'character', 'ASCII'),
(119, 'w', 'LATIN_w', 'Latin Small Letter w', 'character', 'ASCII'),
(120, 'x', 'LATIN_x', 'Latin Small Letter x', 'character', 'ASCII'),
(121, 'y', 'LATIN_y', 'Latin Small Letter y', 'character', 'ASCII'),
(122, 'z', 'LATIN_z', 'Latin Small Letter z', 'character', 'ASCII');

-- Final punctuation (123-126)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(123, '{', 'LEFT_BRACE', 'Left curly bracket', 'punctuation', 'ASCII'),
(124, '|', 'VERTICAL_BAR', 'Vertical bar', 'symbol', 'ASCII'),
(125, '}', 'RIGHT_BRACE', 'Right curly bracket', 'punctuation', 'ASCII'),
(126, '~', 'TILDE', 'Tilde', 'symbol', 'ASCII');

-- Delete (127)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(127, '', 'DEL', 'Delete', 'character', 'ASCII');

-- ============================================================================
-- EXTENDED ASCII / LATIN-1 SUPPLEMENT (128-255)
-- ============================================================================
-- These are the ISO-8859-1 (Latin-1) extended characters

-- Control characters (128-159)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(128, '€', 'EURO', 'Euro sign', 'symbol', 'Latin-1'),
(129, '', 'C1_129', 'Control character', 'character', 'Latin-1'),
(130, '‚', 'SINGLE_LOW_9', 'Single low-9 quotation mark', 'punctuation', 'Latin-1'),
(131, 'ƒ', 'LATIN_f_HOOK', 'Latin small letter f with hook', 'character', 'Latin-1'),
(132, '„', 'DOUBLE_LOW_9', 'Double low-9 quotation mark', 'punctuation', 'Latin-1'),
(133, '…', 'ELLIPSIS', 'Horizontal ellipsis', 'punctuation', 'Latin-1'),
(134, '†', 'DAGGER', 'Dagger', 'symbol', 'Latin-1'),
(135, '‡', 'DOUBLE_DAGGER', 'Double dagger', 'symbol', 'Latin-1'),
(136, 'ˆ', 'CIRCUMFLEX', 'Modifier letter circumflex accent', 'symbol', 'Latin-1'),
(137, '‰', 'PER_MILLE', 'Per mille sign', 'symbol', 'Latin-1'),
(138, 'Š', 'LATIN_S_CARON', 'Latin capital letter S with caron', 'character', 'Latin-1'),
(139, '‹', 'LEFT_ANGLE_QUOTE', 'Single left-pointing angle quotation mark', 'punctuation', 'Latin-1'),
(140, 'Œ', 'LATIN_OE', 'Latin capital ligature OE', 'character', 'Latin-1'),
(141, '', 'C1_141', 'Control character', 'character', 'Latin-1'),
(142, 'Ž', 'LATIN_Z_CARON', 'Latin capital letter Z with caron', 'character', 'Latin-1'),
(143, '', 'C1_143', 'Control character', 'character', 'Latin-1'),
(144, '', 'C1_144', 'Control character', 'character', 'Latin-1'),
(145, ''', 'LEFT_SINGLE_QUOTE', 'Left single quotation mark', 'punctuation', 'Latin-1'),
(146, ''', 'RIGHT_SINGLE_QUOTE', 'Right single quotation mark', 'punctuation', 'Latin-1'),
(147, '"', 'LEFT_DOUBLE_QUOTE', 'Left double quotation mark', 'punctuation', 'Latin-1'),
(148, '"', 'RIGHT_DOUBLE_QUOTE', 'Right double quotation mark', 'punctuation', 'Latin-1'),
(149, '•', 'BULLET', 'Bullet', 'symbol', 'Latin-1'),
(150, '–', 'EN_DASH', 'En dash', 'punctuation', 'Latin-1'),
(151, '—', 'EM_DASH', 'Em dash', 'punctuation', 'Latin-1'),
(152, '˜', 'SMALL_TILDE', 'Small tilde', 'symbol', 'Latin-1'),
(153, '™', 'TRADEMARK', 'Trade mark sign', 'symbol', 'Latin-1'),
(154, 'š', 'LATIN_s_CARON', 'Latin small letter s with caron', 'character', 'Latin-1'),
(155, '›', 'RIGHT_ANGLE_QUOTE', 'Single right-pointing angle quotation mark', 'punctuation', 'Latin-1'),
(156, 'œ', 'LATIN_oe', 'Latin small ligature oe', 'character', 'Latin-1'),
(157, '', 'C1_157', 'Control character', 'character', 'Latin-1'),
(158, 'ž', 'LATIN_z_CARON', 'Latin small letter z with caron', 'character', 'Latin-1'),
(159, 'Ÿ', 'LATIN_Y_DIAERESIS', 'Latin capital letter Y with diaeresis', 'character', 'Latin-1');

-- Non-breaking space and symbols (160-191)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(160, ' ', 'NBSP', 'Non-breaking space', 'character', 'Latin-1'),
(161, '¡', 'INVERTED_EXCLAMATION', 'Inverted exclamation mark', 'punctuation', 'Latin-1'),
(162, '¢', 'CENT', 'Cent sign', 'symbol', 'Latin-1'),
(163, '£', 'POUND', 'Pound sign', 'symbol', 'Latin-1'),
(164, '¤', 'CURRENCY', 'Currency sign', 'symbol', 'Latin-1'),
(165, '¥', 'YEN', 'Yen sign', 'symbol', 'Latin-1'),
(166, '¦', 'BROKEN_BAR', 'Broken bar', 'symbol', 'Latin-1'),
(167, '§', 'SECTION', 'Section sign', 'symbol', 'Latin-1'),
(168, '¨', 'DIAERESIS', 'Diaeresis', 'symbol', 'Latin-1'),
(169, '©', 'COPYRIGHT', 'Copyright sign', 'symbol', 'Latin-1'),
(170, 'ª', 'FEMININE_ORDINAL', 'Feminine ordinal indicator', 'symbol', 'Latin-1'),
(171, '«', 'LEFT_GUILLEMET', 'Left-pointing double angle quotation mark', 'punctuation', 'Latin-1'),
(172, '¬', 'NOT_SIGN', 'Not sign', 'symbol', 'Latin-1'),
(173, '­', 'SOFT_HYPHEN', 'Soft hyphen', 'character', 'Latin-1'),
(174, '®', 'REGISTERED', 'Registered sign', 'symbol', 'Latin-1'),
(175, '¯', 'MACRON', 'Macron', 'symbol', 'Latin-1'),
(176, '°', 'DEGREE', 'Degree sign', 'symbol', 'Latin-1'),
(177, '±', 'PLUS_MINUS', 'Plus-minus sign', 'symbol', 'Latin-1'),
(178, '²', 'SUPERSCRIPT_2', 'Superscript two', 'symbol', 'Latin-1'),
(179, '³', 'SUPERSCRIPT_3', 'Superscript three', 'symbol', 'Latin-1'),
(180, '´', 'ACUTE_ACCENT', 'Acute accent', 'symbol', 'Latin-1'),
(181, 'µ', 'MICRO', 'Micro sign', 'symbol', 'Latin-1'),
(182, '¶', 'PILCROW', 'Pilcrow sign', 'symbol', 'Latin-1'),
(183, '·', 'MIDDLE_DOT', 'Middle dot', 'symbol', 'Latin-1'),
(184, '¸', 'CEDILLA', 'Cedilla', 'symbol', 'Latin-1'),
(185, '¹', 'SUPERSCRIPT_1', 'Superscript one', 'symbol', 'Latin-1'),
(186, 'º', 'MASCULINE_ORDINAL', 'Masculine ordinal indicator', 'symbol', 'Latin-1'),
(187, '»', 'RIGHT_GUILLEMET', 'Right-pointing double angle quotation mark', 'punctuation', 'Latin-1'),
(188, '¼', 'FRACTION_1_4', 'Vulgar fraction one quarter', 'symbol', 'Latin-1'),
(189, '½', 'FRACTION_1_2', 'Vulgar fraction one half', 'symbol', 'Latin-1'),
(190, '¾', 'FRACTION_3_4', 'Vulgar fraction three quarters', 'symbol', 'Latin-1'),
(191, '¿', 'INVERTED_QUESTION', 'Inverted question mark', 'punctuation', 'Latin-1');

-- Accented uppercase letters (192-214)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(192, 'À', 'LATIN_A_GRAVE', 'Latin capital letter A with grave', 'character', 'Latin-1'),
(193, 'Á', 'LATIN_A_ACUTE', 'Latin capital letter A with acute', 'character', 'Latin-1'),
(194, 'Â', 'LATIN_A_CIRCUMFLEX', 'Latin capital letter A with circumflex', 'character', 'Latin-1'),
(195, 'Ã', 'LATIN_A_TILDE', 'Latin capital letter A with tilde', 'character', 'Latin-1'),
(196, 'Ä', 'LATIN_A_DIAERESIS', 'Latin capital letter A with diaeresis', 'character', 'Latin-1'),
(197, 'Å', 'LATIN_A_RING', 'Latin capital letter A with ring above', 'character', 'Latin-1'),
(198, 'Æ', 'LATIN_AE', 'Latin capital letter AE', 'character', 'Latin-1'),
(199, 'Ç', 'LATIN_C_CEDILLA', 'Latin capital letter C with cedilla', 'character', 'Latin-1'),
(200, 'È', 'LATIN_E_GRAVE', 'Latin capital letter E with grave', 'character', 'Latin-1'),
(201, 'É', 'LATIN_E_ACUTE', 'Latin capital letter E with acute', 'character', 'Latin-1'),
(202, 'Ê', 'LATIN_E_CIRCUMFLEX', 'Latin capital letter E with circumflex', 'character', 'Latin-1'),
(203, 'Ë', 'LATIN_E_DIAERESIS', 'Latin capital letter E with diaeresis', 'character', 'Latin-1'),
(204, 'Ì', 'LATIN_I_GRAVE', 'Latin capital letter I with grave', 'character', 'Latin-1'),
(205, 'Í', 'LATIN_I_ACUTE', 'Latin capital letter I with acute', 'character', 'Latin-1'),
(206, 'Î', 'LATIN_I_CIRCUMFLEX', 'Latin capital letter I with circumflex', 'character', 'Latin-1'),
(207, 'Ï', 'LATIN_I_DIAERESIS', 'Latin capital letter I with diaeresis', 'character', 'Latin-1'),
(208, 'Ð', 'LATIN_ETH', 'Latin capital letter Eth', 'character', 'Latin-1'),
(209, 'Ñ', 'LATIN_N_TILDE', 'Latin capital letter N with tilde', 'character', 'Latin-1'),
(210, 'Ò', 'LATIN_O_GRAVE', 'Latin capital letter O with grave', 'character', 'Latin-1'),
(211, 'Ó', 'LATIN_O_ACUTE', 'Latin capital letter O with acute', 'character', 'Latin-1'),
(212, 'Ô', 'LATIN_O_CIRCUMFLEX', 'Latin capital letter O with circumflex', 'character', 'Latin-1'),
(213, 'Õ', 'LATIN_O_TILDE', 'Latin capital letter O with tilde', 'character', 'Latin-1'),
(214, 'Ö', 'LATIN_O_DIAERESIS', 'Latin capital letter O with diaeresis', 'character', 'Latin-1');

-- More symbols (215-223)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(215, '×', 'MULTIPLICATION', 'Multiplication sign', 'symbol', 'Latin-1'),
(216, 'Ø', 'LATIN_O_STROKE', 'Latin capital letter O with stroke', 'character', 'Latin-1'),
(217, 'Ù', 'LATIN_U_GRAVE', 'Latin capital letter U with grave', 'character', 'Latin-1'),
(218, 'Ú', 'LATIN_U_ACUTE', 'Latin capital letter U with acute', 'character', 'Latin-1'),
(219, 'Û', 'LATIN_U_CIRCUMFLEX', 'Latin capital letter U with circumflex', 'character', 'Latin-1'),
(220, 'Ü', 'LATIN_U_DIAERESIS', 'Latin capital letter U with diaeresis', 'character', 'Latin-1'),
(221, 'Ý', 'LATIN_Y_ACUTE', 'Latin capital letter Y with acute', 'character', 'Latin-1'),
(222, 'Þ', 'LATIN_THORN', 'Latin capital letter Thorn', 'character', 'Latin-1'),
(223, 'ß', 'LATIN_SHARP_S', 'Latin small letter sharp s', 'character', 'Latin-1');

-- Accented lowercase letters (224-255)
INSERT INTO symbols_8bit (id, glyph, short_name, long_description, symbol_type, source) VALUES
(224, 'à', 'LATIN_a_GRAVE', 'Latin small letter a with grave', 'character', 'Latin-1'),
(225, 'á', 'LATIN_a_ACUTE', 'Latin small letter a with acute', 'character', 'Latin-1'),
(226, 'â', 'LATIN_a_CIRCUMFLEX', 'Latin small letter a with circumflex', 'character', 'Latin-1'),
(227, 'ã', 'LATIN_a_TILDE', 'Latin small letter a with tilde', 'character', 'Latin-1'),
(228, 'ä', 'LATIN_a_DIAERESIS', 'Latin small letter a with diaeresis', 'character', 'Latin-1'),
(229, 'å', 'LATIN_a_RING', 'Latin small letter a with ring above', 'character', 'Latin-1'),
(230, 'æ', 'LATIN_ae', 'Latin small letter ae', 'character', 'Latin-1'),
(231, 'ç', 'LATIN_c_CEDILLA', 'Latin small letter c with cedilla', 'character', 'Latin-1'),
(232, 'è', 'LATIN_e_GRAVE', 'Latin small letter e with grave', 'character', 'Latin-1'),
(233, 'é', 'LATIN_e_ACUTE', 'Latin small letter e with acute', 'character', 'Latin-1'),
(234, 'ê', 'LATIN_e_CIRCUMFLEX', 'Latin small letter e with circumflex', 'character', 'Latin-1'),
(235, 'ë', 'LATIN_e_DIAERESIS', 'Latin small letter e with diaeresis', 'character', 'Latin-1'),
(236, 'ì', 'LATIN_i_GRAVE', 'Latin small letter i with grave', 'character', 'Latin-1'),
(237, 'í', 'LATIN_i_ACUTE', 'Latin small letter i with acute', 'character', 'Latin-1'),
(238, 'î', 'LATIN_i_CIRCUMFLEX', 'Latin small letter i with circumflex', 'character', 'Latin-1'),
(239, 'ï', 'LATIN_i_DIAERESIS', 'Latin small letter i with diaeresis', 'character', 'Latin-1'),
(240, 'ð', 'LATIN_eth', 'Latin small letter eth', 'character', 'Latin-1'),
(241, 'ñ', 'LATIN_n_TILDE', 'Latin small letter n with tilde', 'character', 'Latin-1'),
(242, 'ò', 'LATIN_o_GRAVE', 'Latin small letter o with grave', 'character', 'Latin-1'),
(243, 'ó', 'LATIN_o_ACUTE', 'Latin small letter o with acute', 'character', 'Latin-1'),
(244, 'ô', 'LATIN_o_CIRCUMFLEX', 'Latin small letter o with circumflex', 'character', 'Latin-1'),
(245, 'õ', 'LATIN_o_TILDE', 'Latin small letter o with tilde', 'character', 'Latin-1'),
(246, 'ö', 'LATIN_o_DIAERESIS', 'Latin small letter o with diaeresis', 'character', 'Latin-1'),
(247, '÷', 'DIVISION', 'Division sign', 'symbol', 'Latin-1'),
(248, 'ø', 'LATIN_o_STROKE', 'Latin small letter o with stroke', 'character', 'Latin-1'),
(249, 'ù', 'LATIN_u_GRAVE', 'Latin small letter u with grave', 'character', 'Latin-1'),
(250, 'ú', 'LATIN_u_ACUTE', 'Latin small letter u with acute', 'character', 'Latin-1'),
(251, 'û', 'LATIN_u_CIRCUMFLEX', 'Latin small letter u with circumflex', 'character', 'Latin-1'),
(252, 'ü', 'LATIN_u_DIAERESIS', 'Latin small letter u with diaeresis', 'character', 'Latin-1'),
(253, 'ý', 'LATIN_y_ACUTE', 'Latin small letter y with acute', 'character', 'Latin-1'),
(254, 'þ', 'LATIN_thorn', 'Latin small letter thorn', 'character', 'Latin-1'),
(255, 'ÿ', 'LATIN_y_DIAERESIS', 'Latin small letter y with diaeresis', 'character', 'Latin-1');

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
DECLARE 
    symbol_count INTEGER;
BEGIN 
    SELECT COUNT(*) INTO symbol_count FROM symbols_8bit;
    
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'Initial Seed Data Loaded Successfully';
    RAISE NOTICE '=================================================================';
    RAISE NOTICE 'Total 8-bit symbols: %', symbol_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Symbol Breakdown:';
    RAISE NOTICE '  - ASCII Control (0-31, 127): 33 symbols';
    RAISE NOTICE '  - ASCII Printable (32-126): 95 symbols';
    RAISE NOTICE '  - Extended Latin-1 (128-255): 128 symbols';
    RAISE NOTICE '';
    RAISE NOTICE 'Next Steps:';
    RAISE NOTICE '  1. Run 003_helper_functions.sql for utility functions';
    RAISE NOTICE '  2. Use helper functions to add higher-level symbols';
    RAISE NOTICE '  3. Import additional character sets (CJK, Arabic, etc.)';
    RAISE NOTICE '=================================================================';
END $$;
