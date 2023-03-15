import { Box, Button, TextField, useTheme, Typography } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import * as yup from "yup";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

const Note = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const ls = localStorage
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const notesLs = JSON.parse(ls.getItem('notes')) || []
  const [notes, setNotes] = useState(notesLs)



  const handleFormSubmit = (values) => {
    console.log(values);

    localStorage.setItem(values.id, values.note)
    values.id += 1
    setNotes(values.note)
    console.log(values);
    console.log(notes);



  };

  
  const keepValues = (values, {resetForm}) => {
    const oldNotes = JSON.parse(ls.getItem('notes')) || []
    const lastNote = oldNotes[oldNotes.length - 1]
    const newNote = { id: lastNote ? lastNote.id + 1 : 1, note: values.note } 
    const newNotes = [...oldNotes, newNote]
    ls.setItem('notes', JSON.stringify(newNotes))
    setNotes((notes) => [...notes, newNote])
    console.log(notes);
    resetForm()
  }
  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    ls.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };


  /*  useEffect(() => {
     notes.push(localStorage.getItem(values.id))
   }, [values ]); */


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "note",
      headerName: "Note",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => (
        <Button sx={{margin:'10px'}} variant="contained" color="error" onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
      renderHeader: () => (
        <Typography
        sx={{paddingLeft:'15px'}}>
          <DeleteOutlined />
          
        </Typography>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CREATE Note" subtitle="Create a New Note" />

      <Formik
        onSubmit={keepValues}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                "& .customButton": {minWidth: isNonMobile ? undefined : "220px" }
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Note"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.note}
                name="note"
                error={!!touched.note && !!errors.note}
                helperText={touched.note && errors.note}
                autoComplete="off" 
                sx={{ gridColumn: "span 3" }}
              />
              <Button className="customButton" type="submit" color="secondary" variant="contained">
                Create New Note
              </Button>

            </Box>

          </form>
        )}
      </Formik>
      <Box
        m="40px 0 0 0"
        height="50vh"
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
          "& .MuiDataGrid-columnHeaders": {
            maxHeight: !isNonMobile ? "45px" :  undefined
          },
        }}>


        <DataGrid
          rows={notes}
          columns={columns} 
          getRowHeight={() => 'auto'}/>
      </Box>
    </Box>

  );
};

const checkoutSchema = yup.object().shape({
  note: yup.string().required()
});
const initialValues = {
  id: 0,
  note: "",
};

export default Note;
