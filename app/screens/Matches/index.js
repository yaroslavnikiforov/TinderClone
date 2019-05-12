import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import CircleImage from "../../components/CircleImage";
import styles from "./styles";

class Matches extends Component {
  render() {
    return (
      <FlatList
        data={demoProfiles}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator}
        style={styles.container}
      />
    );
  }

  _renderItem = ({ item }) => {
    const { id, first_name, work } = item;
    const bio =
      work && work[0] && work[0].position ? work[0].position.name : null;

    return (
      <View style={styles.row}>
        <CircleImage size={80} id={id} />

        <View style={styles.info}>
          <Text style={styles.name}>{first_name}</Text>

          <Text style={styles.bio}>{bio}</Text>
        </View>
      </View>
    );
  };

  _renderSeparator = () => <View style={styles.separator} />;

  _keyExtractor = item => item.id;
}

export default Matches;

const demoProfiles = [
  {
    id: "259389830744794",
    first_name: "Candice",
    birthday: "10/18/1986",
    work: [{ position: { name: "Supermodel" } }]
  },
  {
    id: "720115413",
    first_name: "Alessandra",
    birthday: "1/10/1989",
    work: [{ position: { name: "Dancer" } }]
  },
  {
    id: "912478262117011",
    first_name: "Rosie",
    birthday: "9/4/1989",
    work: [{ position: { name: "Artist" } }]
  },
  {
    id: "1476279359358140",
    first_name: "Alissa",
    birthday: "2/11/1990",
    work: [{ position: { name: "Comedian" } }]
  },
  {
    id: "173567062703796",
    first_name: "Kendall",
    birthday: "8/17/1992",
    work: [{ position: { name: "Truck Driver" } }]
  },
  {
    id: "169571172540",
    first_name: "Miranda",
    birthday: "12/12/1983",
    work: [{ position: { name: "Doctor" } }]
  },
  {
    id: "1492309647685574",
    first_name: "Behati",
    birthday: "3/23/1991",
    work: [{ position: { name: "Developer" } }]
  },
  {
    id: "662254353934918",
    first_name: "Anna",
    birthday: "3/23/1989",
    work: [{ position: { name: "Personal Trainer" } }]
  },
  {
    id: "424154277777372",
    first_name: "Gabriella",
    birthday: "3/23/1988",
    work: [{ position: { name: "Surfer" } }]
  },
  {
    id: "662720103796952",
    first_name: "Mara",
    birthday: "3/23/1987",
    work: [{ position: { name: "Lifeguard" } }]
  }
];
