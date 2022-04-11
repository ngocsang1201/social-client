import { cdnActions } from 'features/common/cdnSlice';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { useAppDispatch } from 'app/hooks';
import { getImageUrlFromCDN } from 'utils/common';

export interface FileInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

export function FileInputField({ name, control, ...inputProps }: FileInputFieldProps) {
  const {
    field: { onChange },
  } = useController({ name, control });

  const dispatch = useAppDispatch();

  const handleFileInputChange = async (e: any) => {
    dispatch(cdnActions.startGetImageUrl());

    try {
      const image = e.target.files[0];
      const imageUrl = await getImageUrlFromCDN(image);

      onChange(imageUrl);
    } catch (error) {
      console.log('Failed to get image url: ', error);
    }

    dispatch(cdnActions.getImageUrlFinished());
  };

  return (
    <input type="file" accept="image/*" onChange={handleFileInputChange} hidden {...inputProps} />
  );
}
