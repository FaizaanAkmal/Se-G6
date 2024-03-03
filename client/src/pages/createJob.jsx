import React, { useState } from 'react';
import { Grid, Box, Typography, FormControl, FormLabel, FormHelperText, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTagsChange = (event, newValue) => {
    setFormData(prevState => ({
      ...prevState,
      tags: newValue
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/jobpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'error') {
        setError(data.error);
      } else if (data.status === 'ok') {
        alert(`Job post submitted successfully! Job Post ID: ${data.id}`);
      }
    } catch (error) {
      console.error('Error submitting job post:', error);
      setError('An error occurred while submitting the job post.');
    }
  };

  return (
    <Grid container sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <Grid
        item
        xs={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={8}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Create Job Post
          </Typography>

          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Job Title</FormLabel>
                    <FormHelperText sx={{textAlign: 'left'}}>
                      Please give an appropriate title for the role.
                    </FormHelperText>
                    <TextField
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Description</FormLabel>
                    <FormHelperText>
                      Please write in detail about the job description, your requirements, and benefits.
                    </FormHelperText>
                    <TextField
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      multiline
                      rows={6}
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Tags</FormLabel>
                    <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={preStoredTags}
                    value={formData.tags}
                    onChange={handleTagsChange}
                    freeSolo 
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Add Tags"
                        />
                    )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button type="submit" fullWidth>
                Create Job Post
              </Button>
            </form>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ backgroundColor: "#f5f5f5" }}>
      </Grid>
    </Grid>
  );
};

const preStoredTags = ['Software Developer', 'Machine Learning Engineer', 'HTML', 'CSS', 'Python', 'AI Engineer', 'Database Engineer', 'System Designer', 'UI/UX Designer'];

export default JobPostForm;