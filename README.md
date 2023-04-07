# Welcome to use the rotating image verification code component. This component is written for React

### Parameter Introduction

```typescript
interface ImageVerificationProps {
  src?: string
  offsetAngleTemp?: number
  onSuccess?: Function
  onFailer?: Function
  imgShow?: boolean
  width?: number
  height?: number
  imgWidth?: number
  deviationAngle?: number
  CustomButton?: React.ReactNode
}
```

- The above are optional parameters

####

1. **src** is the address of the rotated image. If it is not passed in, use the image link I provided
2. **offsetAngleTemp** is the initial angle. You can provide the initial angle yourself or use the built-in random angle without passing in this parameter
3. **onSuccess** is a method that triggers when validation passes
4. **onFailer** is a method that triggers when validation fails
5. **imgShow** is a boolean value that displays the original image when it is true, and not when it is false
6. **width** is the width of the component
7. **height** is the height of the component
8. **imgWidth** is the width and height of the image
9. **deviationAngle** is the deviation value of the verification angle, with a default deviation of 5 degrees
10. **successText** is the copy that has been successfully verified
11. **failText** is the copy that failed validation
12. **initText** is the prompt text
13. **CustomButton** allows you to customize the style of the reset button by defining an element and passing it in

### Use

1. you can use

```typescript
npm install image-verification-rotation
```

or

```typescript
yarn add image-verification-rotation
```

2. This library uses the ES6 module export, so when used

```typescript
import Verification from 'image-verification-rotation'
```

3. There is already a. dts declaration file in the file, so there is no need to import @ types/image verification annotation
4. use

```typescript
<Verification  />
// or
<Verification src="url" onSuccess={your function}  />
```

### Example

```tsx
export default function Example() {

  const Btn: React.FC = () => {
    return <button>sadas</button>
  }
  return (
    <Verification
        src="xxx"
        onSuccess={() => console.log('success')}
        onFailer={() => console.log('failer')}
        imgShow={false}
        offsetAngleTemp={54}
        deviationAngle={10}
        CustomButton={<Btn />}
    />
  )
}

```
