import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useForm, Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";

const SkillGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [skillOptions, setSkillOption] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      skillName: "",
    },
  });

  const columns = useMemo(() => [
    {
      accessorKey: "skillId",
      header: "Skill Id",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
    {
      accessorKey: "skillName", //access nested data with dot notation
      header: "Skill Name",
      muiTableHeadCellProps: {
        align: "center",
      },
      muiTableBodyCellProps: {
        align: "center",
      },
    },
  ]);

  const handleClickOpen = () => {
    setSkillOption([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    let isPresent = false;
    tableData.map((skill) => {
      if (skill.skillName.toLowerCase() === data.skillName.toLowerCase()) {
        isPresent = true;
        return;
      }
    });

    if (isPresent) {
      alert("Skill Already Present!!!");
      return;
    }
    data = [data.skillName.trim()];
    await fetch("/api/skill", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      handleClose();
      getSkills();
    });
  };

  useEffect(() => {
    getSkills();
  }, []);

  const setSkills = (e) => {
    setTimeout(async () => {
      await fetch(`/api/skill/search?skill=${e}`)
        .then((resp) => resp.json())
        .then((resp) => setSkillOption(resp));
    }, 500);
  };

  const getSkills = async () => {
    await fetch("/api/skill")
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Skill"}
          <span style={{ marginLeft: "310px" }}>
            <CloseIcon
              onClick={handleClose}
              style={{ cursor: "pointer", color: "red" }}
            />
          </span>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 item xs={8}>
                <Controller
                  control={control}
                  name="skillName"
                  rules={{ required: "Skill Required" }}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={skillOptions?.map((data) => data.skillName)}
                      onInputChange={(e) => {
                        if (e.target.value === "") setSkillOption([]);
                        else setSkills(e.target.value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          id="skillName"
                          label="Skill Name*"
                          variant="standard"
                          margin="normal"
                          {...params}
                          {...field}
                          error={Boolean(errors?.skillName)}
                          helperText={errors?.skillName?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            <DialogActions>
              <Button color="primary" variant="contained" type="submit">
                Add Skill
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Grid sx={{ m: 0, p: 2 }} align="right">
        <Button
          className="btn-add"
          variant="contained"
          color="success"
          onClick={handleClickOpen}
        >
          <AddCircleOutlineIcon /> &nbsp; Add Skill
        </Button>
      </Grid>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        initialState={{ density: "compact" }}
        enableColumnFilters={false}
        data={tableData}
        enableRowVirtualization
      />
    </>
  );
};

export default SkillGrid;
