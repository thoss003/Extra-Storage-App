//Importing a Component from a Library
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    input:
    {
        padding:10,
        borderWidth:1,
        borderColor:'#ccc',
        width:'80%',
        marginBottom:10,
        borderRadius:5
    },
    container:
    {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#F5FCFF",
    },
    btnText:
    {
        color:'darkblue',
        fontSize:20
    }
});
export default styles;