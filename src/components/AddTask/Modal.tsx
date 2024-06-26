"use client";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

import { useState, Fragment, useRef, FormEvent, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/16/solid";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

function Modal({ user }: { user: KindeUser | null }) {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);
  const [newTaskInput, setTaskInput, addTask] = useBoardStore((state) => [
    state.newTaskInput,
    state.setTaskInput,
    state.addTask,
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setTaskInput({
      [e.target.name]: e.target.value,
    });
  const imagePickerRef = useRef<HTMLInputElement>(null);
  console.log("taskInput", newTaskInput);
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      console.log("Submitting Task here", user);
      e.preventDefault();
      if (!user?.id) return;
      if (!newTaskInput.title || !newTaskInput.type) return;

      console.log("Submitting Task", newTaskInput);
      // adding a new task to appwrite
      addTask({
        title: newTaskInput.title,
        type: newTaskInput.type,
        description: newTaskInput.description,
        image: newTaskInput.image,
        userId: user?.id,
      });
      closeModal();
    },
    [newTaskInput, user, addTask, closeModal]
  );
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10"
        onClose={() => closeModal()}
        onSubmit={handleSubmit}
      >
        {/* This Child is for the backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overlfow-hidden rounded-2xl bg-white p-6 text-left 
						 align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 mb-2"
                >
                  Add a Task
                </Dialog.Title>

                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Title */}
                  <input
                    name="title"
                    type="text"
                    value={newTaskInput.title}
                    onChange={handleInputChange}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />

                  {/* Task type radio button */}
                  <TaskTypeRadioGroup />

                  {/* Task Description */}
                  <textarea
                    name="description"
                    value={newTaskInput.description}
                    onChange={handleInputChange}
                    placeholder="Enter a description here..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />

                  {/* Image Uploader */}
                  <div className="w-full">
                    <button
                      type="button"
                      onClick={() => imagePickerRef.current?.click()}
                      className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                      Upload Image
                    </button>
                    {newTaskInput.image && (
                      <Image
                        alt="Uploaded Image"
                        width={200}
                        height={200}
                        className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150
                        cursor-not-allowed
                      "
                        src={URL.createObjectURL(newTaskInput.image)}
                        onClick={(e) =>
                          setTaskInput({
                            image: undefined,
                          })
                        }
                      />
                    )}
                    <input
                      type="file"
                      ref={imagePickerRef}
                      hidden
                      onChange={(e) => {
                        console.log(e.target.files![0].type);

                        if (!e.target.files![0].type.startsWith("image"))
                          return;

                        setTaskInput({
                          image: e.target.files![0],
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput.title}
                    className="inline-flex justify-center rouned-md border border-transparent bg-blue-100 px-4 py-2
                    text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300
                    disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
