import React, {useEffect, useState} from 'react';
import ListItem from '../../components/ListItem';
import storage from '../../utils/storage';

const Categories = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function load() {
      const cate = await storage.getCategories();

      cate.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      setCategories(cate);
    }
    load();
  }, []);
  return (
    <>
      {categories.map(category => (
        <ListItem
          onPress={() =>{
            console.log("\n\n\n\n\n\n\n\n\n_+++++++++++++++++++++++++++++++++\n\n\n\n\n\n", category)
            navigation.navigate('Search', {screen: "Search", params: {categoryId: category._id}})}
          }
          key={category._id}
          title={category.name}
        />
      ))}
    </>
  );
};

export default Categories;
