

export const modifyImageUrl = (img:string) =>{
    return img.includes('cloudinary')?img:`/products/${img}`
}