import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    ListBucketsCommand,
} from "@aws-sdk/client-s3";


async function createBucket(s3Client, bucketName) {
	try{
		await s3Client.send(
			new CreateBucketCommand({
			Bucket: bucketName
		})
	)
	}catch(err){
		console.log(err)
	}
}

const listBuckets = async(client) => {
	const res = await client.send(new ListBucketsCommand({}))

	return res
}

const putPublicReadObject = async (client, bucketName, object) =>{
	try{
		await client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: object.key,
				Body: object.body,
			})
		)
	}catch(err){
		console.log(err)
	}
}

export async function main(){
    // Creating a S3 Client to communicate with AWS backend
    const client = new S3Client({});
	
	putPublicReadObject(client, "daws-exercise-bucket-1762278950299", {
		key: "cat-image.jpg",
		body: "imageBuffer",
		contentType: "image/jpeg"
	})
}

main()
