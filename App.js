import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newtodo: {
        text: "",
        completed: false
      },
      todos: [],
      count: 0
    };
  }
  handleButtonPress = e => {
    let newtoDo = this.state.newtodo;
    newtoDo.key = this.state.newtodo.text + this.state.todos.length;
    let todoarr = [...this.state.todos, newtoDo];
    let newCount = this.state.count++;
    this.setState({
      newtodo: {
        text: "",
        completed: false
      },
      todos: todoarr
    });
  };
  markCompleted = id => {
    let todos = this.state.todos;
    let newtodoarr = todos.filter(ele => ele.key !== id);
    console.log(todos);
    this.setState({
      todos: newtodoarr
    });
  };
  handleTextChange = e => {
    this.setState({
      newtodo: {
        text: e
      }
    });
  };
  render() {
    return (
      //same as style={container} if we have deconstructed
      <View style={styles.container}>
        <Text style={textFont}>Hello World!</Text>
        <TextInput
          onChangeText={this.handleTextChange}
          placeholder="Add Task"
          value={this.state.newtodo.text}
        />
        <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
        {this.state.todos.length === 0 ? (
          <Text style={textFont}>You are free</Text>
        ) : (
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) => {
              return (
                <View key={item.key}>
                  <Text style={textFont}>{item.text}</Text>
                  <Button
                    onPress={this.markCompleted(item.key)}
                    title="Delete"
                  />
                </View>
              );
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  textFont: {
    fontSize: 28
  }
});

const { container, textFont } = styles;
