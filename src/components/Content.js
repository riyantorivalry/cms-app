// components/Content.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = 'http://localhost:5000/api';

const Content = ({ activeSection, setActiveSection }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [contentList, setContentList] = useState([]);
  const [editingContent, setEditingContent] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${API_URL}/content`);
      setContentList(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleSubmit = async () => {
    if (title && body) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      if (image) {
        formData.append('image', image);
      }

      try {
        if (editingContent) {
          const response = await axios.put(`${API_URL}/content/${editingContent._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setContentList(contentList.map(item => 
            item._id === editingContent._id ? response.data : item
          ));
        } else {
          const response = await axios.post(`${API_URL}/content`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setContentList([response.data, ...contentList]);
        }
        setTitle('');
        setBody('');
        setImage(null);
        setEditingContent(null);
        setActiveSection('dashboard');
      } catch (error) {
        console.error('Error saving content:', error);
      }
    }
  };

  const handleEdit = (content) => {
    setEditingContent(content);
    setTitle(content.title);
    setBody(content.body);
    setImage(null);
    setActiveSection('create');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/content/${id}`);
      setContentList(contentList.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const renderHome = () => (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Content Management System
      </Typography>
      <Grid container spacing={3}>
        {contentList.map((item) => (
          <Grid item xs={12} key={item._id}>
            <Card>
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000${item.imageUrl}`}
                  alt={item.title}
                />
              )}
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body1">
                  {item.body}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderDashboard = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h2">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setActiveSection('create')}
        >
          Add Content
        </Button>
      </Box>
      <Grid container spacing={3}>
        {contentList.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000${item.imageUrl}`}
                  alt={item.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.body}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(item)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderCreateForm = () => (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        {editingContent ? 'Edit Content' : 'Create Content'}
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      {image && <Typography variant="body2">{image.name}</Typography>}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editingContent ? 'Update' : 'Create'}
        </Button>
        <Button variant="outlined" onClick={() => {
          setActiveSection('dashboard');
          setEditingContent(null);
          setTitle('');
          setBody('');
          setImage(null);
        }} sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return renderHome();
      case 'dashboard':
        return renderDashboard();
      case 'create':
        return renderCreateForm();
      default:
        return renderHome();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {renderContent()}
    </Box>
  );
};

export default Content;
