import React, { useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios';
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "auto",

    "& lable": {},
  },

  lable: {
    margin: "7px 0px",
    color: "black",
    fontWeight: "400",
    display: "block",
    fontSize: "20px",
  },
  heading: {
    textAlign: "center",
    fontSize: "30px",
  },
  input: {
    height: "33px",
  },
  generatebtn: {
    marginTop: '20px',
    backgroundColor: '#6F6F6F',
    color: 'white',
    padding: '10px 30px;',
    textTransform: 'capitalize',
    fontSize: '16px',
    fontWeight: '600',

    "&:hover": {

      backgroundColor: "#6F6F6F"
    }
  },
  csvFile: {
    border: " 1px solid #ccc",
    display: " inline-block",
    padding: " 6px 12px",
    cursor: "pointer",
  },
}));

export default function CsvUpload() {
  const [folderName, setFolderName] = useState("");
  const [csv, setCsv] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [email, setEmail] = useState("");
  const [csvName, setCsvName] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setCsvName(csv.replace('.csv', ''))
  }, [csv])


  const Postcsv = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("filename", csv)
    data.append('file', selectedFile)
    axios.post("http://localhost:5000/postCsv", data, {
    })
      .then(response => {
        if (response.status === 200) {
          console.log("Success, firm added")
        } else {
          console.log("Error occurred")
        }
      }
      ).catch(e => {
        console.log(e)
      })
  }

  return (
    <div className="container">
      <form className={classes.root} onSubmit={Postcsv}>
        <h2 className={classes.heading}> Create a Questioare</h2>
        <InputLabel htmlFor="name" className={classes.lable}>
          Questioare Folder Name
        </InputLabel>
        <TextField
          id="name"
          type="text"
          InputProps={{
            className: classes.input,
          }}
          placeholder='Food Quesionare'
          name='qname'
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />

        <InputLabel className={classes.lable}> CSV</InputLabel>

        <TextField
          type="text"
          value={csv}
          name='csv'
          InputProps={{
            className: classes.input,
          }}
          variant="outlined"
          required
        />
        <label for="file-upload" className={classes.csvFile}>
          Choose from file
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={(e) => {
            setCsv(e.target.files[0] && e.target.files[0].name)
            setSelectedFile(e.target.files[0])
          }}

          required
        />

        <InputLabel htmlFor="name" className={classes.lable}>
          CSV name
        </InputLabel>
        <TextField
          id="name"
          type="text"
          InputProps={{
            className: classes.input,
          }}
          variant="outlined"
          fullWidth
          name='csvName'
          value={csvName}
          onChange={(e) => setCsvName(e.target.value)}
          required
        />

        <InputLabel htmlFor="name" className={classes.lable}>
          Assign email to questionare
        </InputLabel>
        <TextField
          id="name"
          type="text"
          InputProps={{
            className: classes.input,
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          placeholder='Enter email address'
          name='email'
          fullWidth
          required
        />

        <Button variant="contained" type='submit' className={classes.generatebtn} disableRipple>

          Generate
        </Button>
      </form>
    </div>
  );
}
