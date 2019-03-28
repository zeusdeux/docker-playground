# docker-test

An example repo to back a [TIL](https://til.mudit.xyz/18) and to host things I learn about `docker` and `docker-compose`.

Say you have a docker multi stage build and you need to consume built artifacts both
within the build - in the following stage(s) for example - and outside it in different ways (push them to s3 for example).

You can do so by creating a container from the image for the `built` stage but not starting it.
Followed by, `docker cp` to copy the folder.

For e.g., in this repo, on CI or locally you can do:

```sh
docker-compose build prod # to build your prod image

# this will build the generate-artifacts image but that is
# super quick since all the layers needed by it are cached due
# to building the prod image (which uses it internally)
# the --build causes a rebuild of the artifacts image so that
# we can incorporate changes in environment like CIRCLE_SHA1 for e.g.,
docker-compose up --no-start --build generate-artifacts

# followed by docker cp to copy the output directory from image
# to host filesystem. Also, the container_name defined in docker-compose.yml
# is used as the first parameter to cp before the colon.
docker cp docker-test-build-container:app/output .
```
This should leave you with the `output` folder with the built artifacts locally on your host os filesystem.


What you end up with is a tiny production image but also the possibility to use artifacts from intermediate stages
in other places (like other jobs in your CI pipeline) without having to rebuild the image or setup volumes or bind mounts.
