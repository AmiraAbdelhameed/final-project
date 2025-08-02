import {
  Avatar,
  Box,
  CircularProgress,
  InputAdornment,
  List,
  ListItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchData, setSearchTerm } from '../../redux/Slices/searchSlice';
import { useNavigate } from 'react-router';

const Search = ({ tableName, page }) => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const { searchTerm, results, loading, error } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (searchTerm) {
      const timeout = setTimeout(() => {
        dispatch(searchData({ searchTerm, tableName })); 
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm, dispatch, tableName]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch(setSearchTerm(''));
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <Box
      ref={wrapperRef}
      sx={{ position: 'relative', width: '100%', mx: 'auto', mt: 4 }}
    >
   
      <TextField
        id="standard-basic"
        variant="standard"
        placeholder="البحث"
        sx={{
          mt: 4,
          width: '100%',
          bgcolor: '#F0EFEF',
          borderRadius: '30px',
          p:2
        }}
        dir="rtl"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      {searchTerm && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 10,
            mt: 1,
            maxHeight: 200,
            overflowY: 'auto',
          }}
          elevation={3}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <CircularProgress size={24} />
            </Box>
          ) : error ? (
            <Box sx={{ p: 2, color: 'red' }}>{error}</Box>
          ) : results.length > 0 ? (
            <List>
              {results.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => navigate(`/admin/${page}/${item.id}`)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2, 
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    alt={item.name}
                    src={item.profile_image}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography>{item.name}</Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>لا توجد نتائج مطابقه</Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Search;
