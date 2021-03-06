import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Dimensions, AsyncStorage, TouchableWithoutFeedback, TouchableOpacity, NativeModules } from 'react-native'
import Header from '../modules/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default class AboutMe extends PureComponent {

    state = {
        email:'',
        fio: '',
        password:'',
        confirm:'',
        gender: '',
        date: '',
        user: '',
    }
    

    async componentDidMount() {
        try {
          const email = await AsyncStorage.getItem('Active')
            this.setState({email: email})
          
          const req = await AsyncStorage.getItem(this.state.email)
            this.setState({user: JSON.parse(req)})
            console.log(this.state.user)
          this.setState({email: email, fio: this.state.user.lastName + ' ' + this.state.user.firstName + ' ' + this.state.user.middleName, password: this.state.user.password, gender: this.state.user.gender, date: this.state.user.date})
          
          const events = await AsyncStorage.getItem(this.state.email + "_events")
          this.setState({my_events: JSON.parse(events)})

          const groups = await AsyncStorage.getItem(this.state.email + "_groups")
          this.setState({my_groups: JSON.parse(groups)})

          console.log(this.state)
        } catch (error) {
          // Error retrieving data
        }
      };

    getAge(birthday){
        var today = new Date();
        var birthDate = new Date(birthday);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age + ' лет';
    }

    getGender(gender){
        let res = ''
        gender === 'male' ? res = 'Муж.' : res = 'Жен.'
        return res 
    }

    async exit(){
        await AsyncStorage.setItem('Active', 'null')
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View style={{ backgroundColor: 'white' }}>
                <Header name={'Профиль'} color={'#A62929'} image={<MaterialCommunityIcons style={{ position: "absolute", right: 10, bottom: 5, opacity: 0.5}} name="account" size={40} color="white" />}/>
                <View style={{ backgroundColor: '#003f5c', minHeight: Dimensions.get('window').height }}>
                    <View style={{ width: '90%', borderRadius: 15, backgroundColor: '#465881', marginTop: 20, alignSelf: 'center'}}>
                        <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>{this.state.fio}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={{ width: '43%', borderRadius: 15, backgroundColor: '#465881', marginTop: 20}}>
                        <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>{this.getAge(this.state.date)}</Text>
                    </View>
                    <View style={{ width: '43%', borderRadius: 15, backgroundColor: '#465881', marginTop: 20}}>
                        <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>{this.getGender(this.state.gender)}</Text>
                    </View>
                    </View>
                    <View style={{ width: '90%', borderRadius: 15, backgroundColor: '#465881', marginTop: 20, alignSelf: 'center'}}>
                        <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>{this.state.email}</Text>
                    </View>
                    <View style={{ height: 180, width: '90%', backgroundColor: '#465881', marginTop: 20, alignSelf: 'center', borderRadius: 15}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Моё', {params: 0})}>
                        <View style={{ height: 60, width: '100%', borderBottomWidth: 2, borderColor: '#003f5c'}}>
                            <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>Мои мероприятия</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Моё', {params: 1})}>
                        <View style={{ height: 60, width: '100%', borderBottomWidth: 2, borderColor: '#003f5c'}}>
                            <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>Мои кружки</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Моё', {params: 2})}>
                        <View style={{ height: 60, width: '100%'}}>
                            <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>Мои книги</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.exit()}>
                        <View style={{ width: '50%', borderRadius: 15, backgroundColor: '#FF5757', marginTop: 20, alignSelf: 'center'}}>
                            <Text style={{ fontFamily: 'Yanone', color: 'white', fontSize: 25, textAlign: 'center', marginTop: 10, marginBottom: 10, width: '100%'}}>Выход</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }
}