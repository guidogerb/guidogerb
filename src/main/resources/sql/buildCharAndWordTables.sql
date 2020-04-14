CREATE TABLE [dbo].[ids_char_table](
	char_value [char](1) NULL
) ON [PRIMARY]
;
CREATE TABLE [dbo].[ids_word_table](
	word [varchar](255) NULL
) ON [PRIMARY]
;
CREATE TABLE [dbo].[ids_surnames](
    [name] [varchar](255) NOT NULL,
    [orderby] [int] NULL,
    [weight] [numeric](18, 0) NULL
    ) ON [PRIMARY]
;
CREATE TABLE [dbo].[ids_male_first_names](
    [name] [varchar](255) NOT NULL,
    [orderby] [int] NULL,
    [weight] [numeric](18, 0) NULL
    ) ON [PRIMARY]
;
CREATE TABLE [dbo].[ids_female_first_names](
    [name] [varchar](255) NOT NULL,
    [orderby] [int] NULL,
    [weight] [numeric](18, 0) NULL
    ) ON [PRIMARY]
