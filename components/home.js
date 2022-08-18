import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNewspaper, faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const url =
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=637c0d3be8f44b85958bd4f9b26c509a";
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => (setData(data.articles), setIsLoading(false)));
  }, []);

  let searched = [];
  useEffect(() => {
    setSearchData(
      data.filter((article) => {
        if (search == "") {
          return article;
        } else if (article.title.toLowerCase().includes(search.toLowerCase())) {
          return article;
        }
      })
    );
  }, []);

  // console.log(data);
//   const click=(title)=>
//   {
// // console.log(title);
// navigation.navigate(`read/${titleId: title}`)
//   }
  return isLoading ? (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color="#b61e47"></ActivityIndicator>
      <View style={{ flexDirection: "row",width:"100%",alignItems:"center",justifyContent:"center" }}>
      <FontAwesomeIcon
            icon={faNewspaper}
            size={24}
            style={{ color: "black",}}
          />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 700,
            color: "black",
           
            fontFamily: "normal",
           
          }}
        >
          World News
        </Text>
        
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {data.map((article, id) => (
        <TouchableOpacity key={id} style={styles.card} onPress={()=>{navigation.navigate('read',data[id])}}>
          <View
            style={{
              width: 200,
              height: 90,
              paddingLeft: 10,
              overflow: "hidden",
            }}
          >
            <Text style={{ fontSize: 11, color: "#b61e47" }}>
              {article.publishedAt}
            </Text>
            <Text style={{ fontWeight: 600 }}>{article.title} ...</Text>
          </View>

          <View
            style={{
              width: 110,
              height: 90,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              style={{ width: 120, height: 90 }}
              source={{
                uri: `${article.urlToImage}`,
              }}
            />
          </View>
          {/* <Text>assadsfafs</Text> */}
        </TouchableOpacity>
      ))}
      {/*NavBar*/}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", marginTop: 40, marginLeft: 30 }}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: "serif",
              marginLeft: 10,
              color: "#f4f5f5",
            }}
          >
            News
          </Text>
          <TextInput
            type="text"
            placeholder="Search.."
            style={styles.search}
            onChange={(e) => setSearch(e.target.value)}
          ></TextInput>
        </View>
        <TouchableOpacity style={{ position: "absolute", top: 57, right: "10%" }}>
          <FontAwesomeIcon
            icon={faSearch}
            size={17}
            style={{ color: "gray" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    paddingTop: 95,
  },
  header: {
    width: "100%",
    height: 90,
    backgroundColor: "#b61e47",
    justifyContent: "center",
    marginBottom: 5,
    position: "fixed",
    top: 0,
    opacity: 1,
  },
  search: {
    width: "70%",
    backgroundColor: "#e2a5b5",
    fontSize: 13,
    height: 36,
    padding: 10,
    borderRadius: 15,
    marginLeft: 15,
    borderWidth: 0,
  },
  card: {
    width: "98%",
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 120,
  },
});

export default Home;
