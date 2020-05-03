import React from 'react';
import { Context as UserContext } from '../components/withUser';

const useUserContext = () => React.useContext(UserContext);

export { useUserContext };
