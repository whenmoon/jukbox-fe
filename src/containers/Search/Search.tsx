import React, { useEffect, useState } from 'react';
import './Search.css';
import { searchSongs } from '../../redux/actions/'
import { useSelector, useDispatch } from 'react-redux';
import SearchResList from '../../components/SearchResList/SearchResList'
import { Input, Icon } from 'antd';
import styled from 'styled-components/macro';
import { getUserProfile } from '../../redux/actions/';
import { Redirect } from 'react-router-dom'

const { Search } = Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display:inline;
`

const StyledBackIcon = styled(Icon)`
font-size: 40px;
padding: 2px 0px 0px 20px;
  svg {
    fill: var(--secondary-color);
  }
`

const StyledSearchBar = styled(Search)`
  padding: 8px 20px;
  background-color: var(--primary-bg-color);
  color: var(--primary-color);
`;

const SearchContainer: React.FC = () => {

  const [goBackFlag, setGoBackFlag] = useState(false);

  const handleGoBack = () => {
    setGoBackFlag(true)
  }

  const searchResults = useSelector((state: any) => state.searchResults.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [])

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(searchSongs(event.currentTarget.value));
  };

  const renderRedirect = () => {
    if (goBackFlag) return <Redirect to='/dashboard' />
  }

  return (
    <Container>
      {renderRedirect()}
      <StyledBackIcon type="rollback" onClick={handleGoBack}/>
      <StyledSearchBar placeholder="search songs" onChange={handleChange} style={{ width: "85%" }} enterButton />
      {searchResults ? <SearchResList songs={searchResults} /> : null}
    </Container>
  );
}

export default SearchContainer;
