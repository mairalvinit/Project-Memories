
import React,{useState} from 'react';
import {Container,Grid,Grow,Paper,AppBar,TextField,Button} from '@material-ui/core'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useHistory,useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

//hooks
import {useDispatch} from 'react-redux';
// eslint-disable-next-line
import {getPostBySearch} from '../../actions/posts';
import Pagination from '../Pagination.js';

//styles

import useStyles from './styles';

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

const Home = ()=> {
    const [currentId , setCurrentId] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);

    // useEffect(()=>{
    //     dispatch(getPosts());
    // },[currentId,dispatch]);



    const searchPost = () => {
        if(search.trim() || tags){
        
            dispatch(getPostBySearch({search , tags : tags.join(',')}));
            
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    }

    const handleKeyPress = (e) =>{
        if(e.keyCode === 13){
            searchPost();
        }
    }
    const handleAdd = (tag) => setTags([...tags,tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag)=> tag !== tagToDelete));

    return(
<Grow in>
                <Container maxWidth="xl">
                    <Grid container className={classes.gridContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>

                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                name="search" 
                                variant="outlined" 
                                label= "Search Memories"
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                               />
                               <ChipInput 
                                   style={{margin : "10px 0"}}
                                   value={tags}
                                   onAdd={handleAdd}
                                   onDelete={handleDelete}
                                   label = "Search tags"
                                   variant="outlined"

                                   />
                                   <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                                </AppBar>
                            
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>

                            {(!searchQuery && !tags.length)&&(
                                
                            <Paper  className={classes.pagination} elevation={6}>
                               <Pagination page={page} />
                            </Paper>
                            )}

                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )}

export default Home;