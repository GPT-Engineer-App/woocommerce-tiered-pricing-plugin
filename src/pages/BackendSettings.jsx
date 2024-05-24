import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, HStack, Select } from '@chakra-ui/react';

const BackendSettings = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [lengths, setLengths] = useState([]);
  const [currentLength, setCurrentLength] = useState('');
  const [tieredPrices, setTieredPrices] = useState([]);

  const addProduct = () => {
    setProducts([...products, { name: currentProduct, lengths: [] }]);
    setCurrentProduct('');
  };

  const addLength = (productIndex) => {
    const newLengths = [...lengths];
    newLengths[productIndex] = [...(newLengths[productIndex] || []), currentLength];
    setLengths(newLengths);
    setCurrentLength('');
  };

  const addTieredPrice = (productIndex, lengthIndex) => {
    const newTieredPrices = [...tieredPrices];
    newTieredPrices[productIndex] = newTieredPrices[productIndex] || [];
    newTieredPrices[productIndex][lengthIndex] = newTieredPrices[productIndex][lengthIndex] || [];
    newTieredPrices[productIndex][lengthIndex].push({ quantity: '', price: '' });
    setTieredPrices(newTieredPrices);
  };

  const updateTieredPrice = (productIndex, lengthIndex, tierIndex, field, value) => {
    const newTieredPrices = [...tieredPrices];
    newTieredPrices[productIndex][lengthIndex][tierIndex][field] = value;
    setTieredPrices(newTieredPrices);
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input value={currentProduct} onChange={(e) => setCurrentProduct(e.target.value)} />
          <Button mt={2} onClick={addProduct}>Add Product</Button>
        </FormControl>

        {products.map((product, productIndex) => (
          <Box key={productIndex} borderWidth="1px" borderRadius="lg" p={4}>
            <FormControl>
              <FormLabel>Length for {product.name}</FormLabel>
              <Input value={currentLength} onChange={(e) => setCurrentLength(e.target.value)} />
              <Button mt={2} onClick={() => addLength(productIndex)}>Add Length</Button>
            </FormControl>

            {lengths[productIndex] && lengths[productIndex].map((length, lengthIndex) => (
              <Box key={lengthIndex} borderWidth="1px" borderRadius="lg" p={4} mt={4}>
                <FormLabel>Tiered Pricing for {product.name} - {length}</FormLabel>
                <Button onClick={() => addTieredPrice(productIndex, lengthIndex)}>Add Tiered Price</Button>

                {tieredPrices[productIndex] && tieredPrices[productIndex][lengthIndex] && tieredPrices[productIndex][lengthIndex].map((tier, tierIndex) => (
                  <HStack key={tierIndex} mt={2}>
                    <Input
                      placeholder="Quantity"
                      value={tier.quantity}
                      onChange={(e) => updateTieredPrice(productIndex, lengthIndex, tierIndex, 'quantity', e.target.value)}
                    />
                    <Input
                      placeholder="Price"
                      value={tier.price}
                      onChange={(e) => updateTieredPrice(productIndex, lengthIndex, tierIndex, 'price', e.target.value)}
                    />
                  </HStack>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default BackendSettings;