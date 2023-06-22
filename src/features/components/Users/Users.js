import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Stack,
  Text,
  StackDivider,
  Grid,
  GridItem,
  Flex,
  Avatar,
  IconButton
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
import Loader from '../../common/Loader';
import { getUserList, userStateValues, deleteUser } from './userSlice';
import AlertDialogCustom from '../../common/AlertDialog';

export function Users() {
  const { list, isFetching } = useSelector(userStateValues);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(true);
  const dispatch = useDispatch();

  const handleDeleteAction = () => {
    dispatch(deleteUser(selectedIndex))
    setOpenDialog(false);
  }

  const handleDeleteButton = (index) => {
    setSelectedIndex(index);
    setOpenDialog(true);
  }

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6} m={10}>
      {
        list.map((details, index) => {
          return <GridItem w='100%'>
            <Card
              overflow='auto'
              variant='outline'
              maxW='md'
            >
              <CardHeader>
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name={details.name} />

                    <Box>
                      <Heading size='sm'>{details.name}</Heading>
                    </Box>
                  </Flex>
                  <IconButton
                    variant='ghost'
                    colorScheme='red'
                    aria-label='See menu'
                    onClick={() => handleDeleteButton(index)}
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Phone
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {details.phone}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size='xs' textTransform='uppercase'>
                      Email
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                      {details.email}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        })
      }

      <Loader isLoading={isFetching} />

      <AlertDialogCustom
        isOpen={openDialog}
        title="Remove User"
        onCancel={() => setOpenDialog(false)}
        onProceed={handleDeleteAction}
      />
    </Grid>
  );
}
