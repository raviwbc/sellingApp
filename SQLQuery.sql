select * from active_item
select top 1 * from bidHistorylist ORDER BY Prize DESC
insert into bidHistorylist values('SRH', 'Kanguva', null, 2.0)
update active_item set Records = '[]' where id=2
INSERT INTO active_item (name, Country, Records, base_p) OUTPUT INSERTED.* VALUES ('Kangva', 'NZ', '', 2)

select * from bidHistorylist



USE [test_db]
GO

/****** Object:  Table [dbo].[teamList]    Script Date: 19-11-2024 08:37:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[teamList](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamName] [varchar](100) NULL,
	[availablePrize] [int] NULL,
	[minimumPlayersReq] [int] NULL,
	[maximumPlayersReq] [int] NULL,
	[pickedPlayes] [text] NULL,
	[isAvailable] [bit] NULL,
 CONSTRAINT [PK_teamList] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


insert into teamList values('CSK', 86,18,25,'[]',1 )
insert into teamList values('MI', 86,18,25,'[]',1 )
insert into teamList values('SRH', 86,18,25,'[]',1 )
