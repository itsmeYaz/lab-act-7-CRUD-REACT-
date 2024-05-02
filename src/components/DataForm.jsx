import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button.jsx";
import { Link } from "react-router-dom";

const DataForm = () => {
  const [data, setData] = useState([]);

  //GET REQUEST
  useEffect(() => {
    axios
      .get(
        "https://thriving-syrniki-e5a1a8.netlify.app/.netlify/functions/api/",
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  function handleDelete(id) {
    axios
      .delete(
        `https://thriving-syrniki-e5a1a8.netlify.app/.netlify/functions/api/${id}`,
      )
      .then((res) => {
        // Remove the deleted item from the state
        setData(data.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  }

  console.log(data);

  return (
    <div className="mt-3">
      <div className="w-[50%] mx-auto">
        <div className="text-end">
          <Button asChild>
            <Link to="/create">Add Author +</Link>
          </Button>
        </div>
        <Table>
          <TableCaption>List of Authors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Author Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>
                  <Button
                    asChild
                    className="mx-2"
                    variant="secondary"
                    size="sm"
                  >
                    <Link to={`/update/${item._id}`}>Update</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the author and remove author data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(item._id)}
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataForm;
