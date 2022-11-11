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

        return {
            color: "#" + Math.floor(Math.random() * (255 + 1)).toString(16) + Math.floor(Math.random() * (255 + 1)).toString(16) + Math.floor(Math.random() * (255 + 1)).toString(16),
            backgroundColor: "#" + Math.floor(Math.random() * (255 + 1)).toString(16) + Math.floor(Math.random() * (255 + 1)).toString(16) + Math.floor(Math.random() * (255 + 1)).toString(16),
            flexDirection:'row', flexWrap:'wrap'
        }
    }



    function PrintCharColor(char) {
      // console.log("dans PrintCharcolor les clés de l'objet sont" + Object.keys(char));
       // console.log("dans PrintCharcolor Le char.char est" + char.charactere);
        return (
            <Text style={ReturnLambdaHex()} > {char.charactere}</Text> //Here the hex color style is calculated
                                                            //using the function
        );

    }


    function Traitement({saisie}) {
        console.log("saisie dans traitement " + saisie);
        const tableauChaine = saisie.split('');
        var array =  Array.from(Array(100).keys()); //build an array of 100 numbers
        return array.map(() => ( tableauChaine.map((char, key) => (
            <PrintCharColor key={key} charactere ={char} />))));

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
