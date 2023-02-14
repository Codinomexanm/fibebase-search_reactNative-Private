import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import bds from '../../data/data'



export default function Task({ navigation }) {
  const [task, setTask] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredTask, setFilteredTask] = useState([]);



  useEffect(() => {
    setTask(bds);
    setFilteredTask(bds);
  }, []);

  const filterList = (query) => {
    setQuery(query);
    const filtered = task.filter((item) => item.name.includes(query));
    setFilteredTask(filtered);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#110a72', }}>
      <Text style={{ color: 'white' }}>PESQUISE A CTO</Text>
      <TextInput
        autoCorrect={false}
        autoCompleteType="off"
        autoCapitalize='characters'
        style={{ width: '95%', height: 40, borderColor: 'gray', borderWidth: 1 ,borderRadius: 10,paddingLeft:10, backgroundColor: '#fff'}}
        onChangeText={(text) => filterList(text)}
        value={query}
        placeholder="Pesquise a CTO..."
      />
      <FlatList
  showsVerticalScrollIndicator={false}
  data={filteredTask}
  numColumns={4}
  renderItem={({ item }) => {
    return (
      <TouchableOpacity
        style={{width: 90, height: 50,backgroundColor: '#ff700a', borderRadius: 6,borderWidth: 1,borderColor: '#fff',marginRight:5,marginTop:8}}
        onPress={() => {
          if (item.coordinate && item.coordinate.latitude && item.coordinate.longitude) {
            navigation.navigate('Maps', {
              nome:item.name,
              longitude: parseFloat(item.coordinate.latitude),
              latitude: parseFloat(item.coordinate.longitude),
            });
          }
        }}
      >
        <Text style={{color: 'white',textAlign: 'center',fontWeight: 'bold', fontSize:15, flex: 1, justifyContent: 'center', alignItems: 'center',marginTop: 5 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  }}
/>
    </View>
  );
}
