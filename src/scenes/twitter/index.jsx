import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTweets } from "../../data/mockDataTweets";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { getTweetsDb, getReferences } from "./getTweetsDb"


import BasicSelect from "../../components/basicSelect";

const Twitter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userTweets, setUserTweets] = React.useState('CFoltao');
  const [rowData, setRowData] = React.useState([]);

  const [ref, setRef] = React.useState([]);

  useEffect(() => {
    const fetchRef = async () => {
      const refData = await getReferences();
      setRef(refData);
    };
    fetchRef();
  }, []);





  useEffect(() => {



    const fetchData = async () => {
      const newData = await getTweetsDb(userTweets);
      setRowData(newData);
    }
    fetchData();
    return () => {
    }
  }, [userTweets]);

  const handleChangeGrid = async (e) => {
    // setRowData(getTweetsDb(userTweets))
    // console.log(rowData);

  };
  const handleChange = async (event) => {
    // const newdata = await getTweetsDb(userTweets)
    // setRowData(newdata)
    setUserTweets(event.target.value);
    // rowData =  await getTweetsDb(userTweets)
    // console.log(userTweets);


  };
  // console.log(userTweets);
  // console.log(rowData);


  const columns = [
    {
      field: "created_at", headerName: "Created At", flex: .1, renderCell:
        (params) => {
          let date = new Date(params.row.created_at);
          let options = {
            timeZone: 'America/Sao_Paulo',
            year: '2-digit',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          };
          let formattedDate = date.toLocaleDateString('pt-BR', options);
          return formattedDate
        }
    },
    { field: "tweetUrl", headerName: "Tweet Url", flex: .1, renderCell: (params) => <a href={params.row.tweetUrl}>TweetUrl</a> },
    { field: "text", headerName: "Text", flex: .2 },
    {
      field: "mediaUrl", headerName: "Media URL", flex: .2, renderCell: (params) => {
        if (Array.isArray(params.row.mediaUrl)) {
          if (params.row.mediaUrl && params.row.mediaUrl[0] && params.row.mediaUrl[1] !== null || undefined) {
            const mediaLinks = params.row.mediaUrl.map((mediaUrl, i) => {
              return (
                <React.Fragment key={i}>
                  <a href={mediaUrl}> media{i + 1} _ </a>

                </React.Fragment>
              )/* <a href={mediaUrl}>{mediaUrl}</a>; */
            });
            return mediaLinks
          }
        } else {
          return <a href={params.row.mediaUrl}>{params.row.mediaUrl}</a>;
        }
      }
    },
    { field: "user", headerName: "User", hide: true },
    { field: "id", headerName: "ID", hide: true },
    {
      field: "referenced_tweet_url", headerName: "Referenced Tweet Url", flex: .1, renderCell: (params) => {
        if (params.row.referenced_tweet_url && params.row.referenced_tweet_url.url) {
          return <a href={params.row.referenced_tweet_url.url}>RefTweetUrl</a>;
        } else {
          return "N/A";
        }
      }
    },
    {
      field: "referenced_tweet_text", headerName: "Ref Text", flex: .3, renderCell: (params) => {
        if (params.row.referenced_tweet_url && params.row.referenced_tweet_url.text) {
          return params.row.referenced_tweet_url.text;
        } else {
          return "N/A";
        }
      }
    },
    {
      field: "referenced_tweet_media", headerName: "Ref Media", flex: .1,
      renderCell: (params) => {
        if (params.row.referenced_tweet_url && params.row.referenced_tweet_url.mediaUrl) {

          if (Array.isArray(params.row.referenced_tweet_url.mediaUrl)) {
            if (params.row.referenced_tweet_url.mediaUrl && params.row.referenced_tweet_url.mediaUrl[0] && params.row.referenced_tweet_url.mediaUrl[1] !== null || undefined) {
              const mediaLinks = params.row.referenced_tweet_url.mediaUrl.map((mediaUrl, i) => {
                return (
                  <React.Fragment key={i}>
                    <a href={mediaUrl}> media{i + 1} _ </a>

                  </React.Fragment>
                )/* <a href={mediaUrl}>{mediaUrl}</a>; */
              });
              return mediaLinks
            }
          } else {
            return <a href={params.row.referenced_tweet_url.mediaUrl}>media</a>;
          }
        }
      }


      // renderCell: (params) => {
      //   if (params.row.referenced_tweet_url && params.row.referenced_tweet_url.mediaUrl) {
      //     return <a href={params.row.referenced_tweet_url.mediaUrl}>{params.row.referenced_tweet_url.mediaUrl}</a>;
      //   } else {
      //     return "N/A";
      //   }
      // }
    },
    { field: "referenced_tweets", headerName: "Referenced Tweet", hide: true },
    { field: "in_reply_to_user_id", headerName: "In Reply To User ID", hide: true }];





  return (
    <Box m="15px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingRight="130px">
        <Header
          title="Twitter"
          subtitle="List of Tweets"
        />

        <Box sx={{
          minWidth: 50,
          maxWidth: 300
        }}>

          <BasicSelect
            values={ref}
            onChange={handleChange}
            selectedValue={userTweets}
          />

        </Box>
      </Box>
      <Box
        m="0 0 0 0"
        height="75vh"
        sx={{

          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& a": {
            textDecoration: "none",
            color: `${colors.grey[100]} !important`,
            overflow: "hidden",
            whiteSpace: "nowrap"
          },
        }}
      >


        <DataGrid
          // initialState={{
          //   columns: {
          //     columnVisibilityModel: {
          //       ID: false,
          //       Text: false
          //     },
          //   },
          // }}
          onChange={handleChangeGrid}
          sx={{
            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
            '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '28px' },

          }}
          rows={rowData}
          // rows={mockDataTweets.data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}

          getRowHeight={() => 'auto'}

        />
      </Box>
    </Box>
  );
};

export default Twitter;
