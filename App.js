import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, Button, Pressable} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';
import {useEffect, useState} from "react";


const Stack = createStackNavigator(); //usual stack navigator for the two screens
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Display" component={Display}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

//


function Home({navigation}) {
    let saisieSend;

    const _onChangeSaisie = (saisie) => {
        saisieSend = saisie;
        console.log(saisie);
    }
    return (
        <View style={styles.Home}>

            <TextInput placeholder="Saisie" autoFocus type="Saisie" value={saisieSend}
                       onChangeText={(saisie) => _onChangeSaisie(saisie)}/>

            <Pressable style={styles.button} onPress={() => navigation.navigate('Display', {saisie: saisieSend})}>
                <Text style={styles.text}>Traitement</Text>
            </Pressable>


            <StatusBar style="auto"/>
        </View>
    );
}

function Display({navigation, route}) {
    console.log("Les params dans display sont " + route.params);

    let saisie = route.params ? route.params.saisie : console.log("pas de saisie transférée");
    console.log("Arrivée de la saisie dans Display :" + saisie);

    function ReturnLambdaHex() {
        let premier = Math.floor(Math.random() * (255 + 1));
        let deuxieme = Math.floor(Math.random() * (255 + 1));
        let troisieme = Math.floor(Math.random() * (255 + 1));
        let quatrieme = Math.floor(Math.random() * (255 + 1));
        let cinquieme = Math.floor(Math.random() * (255 + 1));
        let sixieme = Math.floor(Math.random() * (255 + 1));
       // console.log("La couleur de la lettre est :#" + premier.toString(16) + deuxieme.toString(16) + troisieme.toString(16));
        return {
            color: "#" + premier.toString(16) + deuxieme.toString(16) + troisieme.toString(16),
            backgroundColor: "#" + quatrieme.toString(16) + cinquieme.toString(16) + sixieme.toString(16),
            flexDirection:'row', flexWrap:'wrap'
        }
    }


    function Traitement({saisie}) {
        console.log("saisie dans traitement " + saisie);
        var array =  Array.from(Array(100).keys()); //build an array of 100 numbers
  return array.map(() => ( DivideChaine(saisie)))

    }

    function PrintCharColor(char) {
       // console.log("dans PrintCharcolor Le caractère est" + char);
        return (
            <Text style ={ReturnLambdaHex()}> {char}</Text> //Here the hex color style is calculated
                                                            //using the function
        );

    }

    function DivideChaine(chaine) {
       // console.log("Transmission de la saisie dans DivideChaine :" + chaine+ ".");
        const tableauChaine = chaine.split(''); //division of the string in an array of char
        return tableauChaine.map((char, index) => (<Text key={index} style={{flexDirection:'row', flexWrap:'wrap'}}>
            {PrintCharColor(char)} </Text>));
    }

    return (// the component traitement is a chain of functions
        <View style={styles.Display}>
            <Traitement saisie={saisie}/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    Home: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Display: {
        flex: 1,
        flexDirection:'row', flexWrap:'wrap', //this style keep the chars inline
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
