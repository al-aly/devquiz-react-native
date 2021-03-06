import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';

import {Container, ButtonsContainer} from './styles';
import {PageContainer} from '~/Components/Layout';
import Header from '~/Components/Header';
import ProfileHomeDisplay from '~/Components/ProfileHomeDisplay';
import CustomButton from '~/Components/CustomButton';
import {createRoom} from '~/Service/MatchApi';
import {getRecentlyUsers} from '~/Service/AuthApi';
import {useAuth} from '~/Contexts/AuthContext';
import {useGame} from '~/Contexts/GameContext';
import {useApp} from '~/Contexts/AppContext';
import UserList from '~/Components/UserList';

export default function Home({navigation}) {
  const [recentlyUsers, setRecentlyUsers] = useState([]);
  const {user} = useAuth();
  const {game, setGame, hubConnect, emit} = useGame();
  const {setLoading} = useApp();

  useEffect(() => {
    getRecentlyUsersData();
    hubConnect.on('recent-played', onRecentPlayed);
    emit('client-connect');

    return () => {
      hubConnect.off('recent-played', onRecentPlayed);
    };
  }, []);

  const getRecentlyUsersData = async () => {
    const userList = await getRecentlyUsers();
    setRecentlyUsers(filterMyselfFromRecentUsers(userList.data));
  };
  const onRecentPlayed = (data) => {
    console.log(`onRecentPlayed ${Platform.OS}`, data);
    setRecentlyUsers(filterMyselfFromRecentUsers(data));
  };
  const filterMyselfFromRecentUsers = (data) => {
    return data.filter((item) => item.id != user.id);
  };

  const handleCreateRoom = async () => {
    setLoading(true);
    try {
      const dataReturn = await createRoom(user.id);
      const {matchId, matchCode} = dataReturn.data;
      setGame({...game, matchId: matchId, roomCode: matchCode});
      navigation.navigate('WaitingRoom');
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Server error, try again later.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    setLoading(false);
  };
  return (
    <PageContainer justifyContent="flex-start">
      <Header back/>
      <ProfileHomeDisplay />
      <UserList data={recentlyUsers} title={'Recently users'} />
      <ButtonsContainer>
        <CustomButton onPress={() => handleCreateRoom()}>
          Create Room
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate('JoinRoom')}>
          Join Room
        </CustomButton>
      </ButtonsContainer>
    </PageContainer>
  );
}
