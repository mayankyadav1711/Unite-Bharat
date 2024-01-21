const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  technologyStack: [
    {
      type: String,
    },
  ],
  googleDriveLink: {
    type: String,
  },
  projectVisibility: {
    type: String,
    required: true,
  },
  youtubeVideoLink: {
    type: String,
  },
  teamMembers: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  mentors: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],


 
  projectMethod: {
    type: String,
   
    required: true,
  },
  projectType: {
    type: String,
   
    required: true,
  },
  projectDuration: {
    type: Number,
  },
  tags: {
    type: String,
  },
  flowchart: {
    type: String,
  },
  architecture: {
    type: String,
  },
  likes:[{
    type:ObjectId,
    ref:"User"
}],
  views:[{
    type:ObjectId,
    ref:"User"
}],
uploadDate:{
    type:Date,
    required:true
},
 
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

ProjectSchema.pre('findOne', autoPopulateUser);
ProjectSchema.pre('find', autoPopulateUser);

function autoPopulateUser(next) {
  this.populate('postedBy', 'name email university usertype profilePic');
  next();
}

mongoose.model('Project', ProjectSchema);
