import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditCategories = (props: Props) => {
  const [categories, setCategories] = useState<any>([]);
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [
    editLayout,
    { isSuccess: layoutSuccess, error },
  ] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch()
      toast.success("Categories Updated Successfully!");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message);
    }
  }, [data, layoutSuccess, error]);
  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };
  const newCategoriesHandler = () => {
    if (
      categories.length > 0 &&
      categories[categories.length - 1].title === ""
    ) {
      toast.error("Category Title cannot be Empty!");
    } else {
      setCategories((prevCategories: any) => [
        ...prevCategories,
        { title: "" },
      ]);
    }
  };
  const areCategoriesUnchanged = (original: any, current: any) => {
    if (!original || !current) return true;
    return JSON.stringify(original) === JSON.stringify(current);
  };
  const isAnyCategoryTitleEmpty = (categories: any) => {
    return categories.some((cat: any) => cat.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) ||
      isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories.map((item: any, index: number) => {
            return (
              <div className="p-3" key={index}>
                <div className="flex items-center w-full justify-center">
                  <input
                    className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoriesAdd(item._id, e.target.value)
                    }
                    placeholder="Enter category title..."
                  />
                  <AiOutlineDelete
                    className="dark:text-white text-black text-[18px] cursor-pointer"
                    onClick={() => {
                      setCategories((prevCategory: any) =>
                        prevCategory.filter((i: any) => i._id !== item._id)
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}

          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
                ${
                  areCategoriesUnchanged(
                    data?.layout?.categories,
                    categories
                  ) || isAnyCategoryTitleEmpty(categories)
                    ? "!cursor-not-allowed"
                    : "!cursor-pointer !bg-[#42d383]"
                }
                !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
