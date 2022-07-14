import { GLTFModel, AmbientLight, DirectionLight, Tick } from 'react-3d-viewer'

const ShowMoon = () => {
  // const animate = () => {
  //   this.tick = Tick(() => {
  //     var { rotation } = this.this.state
  //     rotation.y += 0.005
  //     this.setState({ rotation })
  //   })
  // }
  return (
    <div>
      {/* {animate}; */}
      <GLTFModel width="150" height="150" background="rgba(3,32,50)" position={{ x: 0, y: 0, z: 0 }} src="images/luna/scene.gltf">
        {/* 조명 */}
        <AmbientLight color={0xffffff} />
        <DirectionLight color={0xffffff} position={{ x: 100, y: 200, z: 100 }} />
        <DirectionLight color={0xff00ff} position={{ x: -100, y: 200, z: -100 }} />
      </GLTFModel>
    </div>
  )
}

export default ShowMoon;